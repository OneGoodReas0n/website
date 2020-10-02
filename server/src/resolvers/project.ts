import Project from "../entities/Project";
import {
  Resolver,
  Query,
  Arg,
  InputType,
  Field,
  ObjectType,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { GenericResponse } from "./types";
import { validateProject, errorsMap, Errors } from "../utils/validator";
import Picture from "../entities/Picture";
import Technology from "../entities/Technology";

const addOrReturnPictureAsync = async (
  pictureLink: string
): Promise<Picture> => {
  return new Promise(async (resolve) => {
    const picture = await Picture.findOne({
      where: { publicLink: pictureLink },
    });
    if (picture) {
      resolve(picture);
    } else {
      const newPicture = await Picture.create({
        publicLink: pictureLink,
      }).save();
      resolve(newPicture);
    }
  });
};

const deletePictureAsync = async (pictureLink: string): Promise<Boolean> => {
  const picture = await Picture.findOne({
    where: { publicLink: pictureLink },
  });
  if (picture) {
    picture.project = new Project();
    await picture.save();
    await Picture.delete(picture.id);
    return true;
  }
  return false;
};

@InputType()
export class ProjectInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field()
  status: "In develop" | "Completed" | "Planned";
  @Field(() => [String], { nullable: true })
  pictureUrls: string[];
  @Field(() => [String], { nullable: true })
  technologyNames: string[];
}

@ObjectType()
class ProjectResponse extends GenericResponse(Project) {}

@Resolver(Project)
export default class TechnologyResolver {
  @FieldResolver(() => [Picture], { nullable: true })
  async pictures(@Root() project: Project) {
    const pictures = await Picture.find({
      where: { project: project.id },
      relations: ["project"],
    });
    return pictures;
  }
  @FieldResolver(() => [Technology], { nullable: true })
  async technologies(@Root() project: Project) {
    const currentProject = await Project.findOne(project.id, {
      relations: ["technologies"],
    });
    return currentProject?.technologies;
  }

  @Query(() => Project, { nullable: true })
  async getProject(@Arg("id") id: number): Promise<Project | null> {
    const project = await Project.findOne(id);
    if (!project) {
      return null;
    }
    return project;
  }

  @Query(() => [Project])
  async getProjects(): Promise<Project[]> {
    const projects = await Project.find();
    return projects;
  }

  @Mutation(() => ProjectResponse)
  async createProject(
    @Arg("input") input: ProjectInput
  ): Promise<ProjectResponse> {
    const { name, description, status, pictureUrls, technologyNames } = input;
    let pictures: Picture[] = [];
    let technologies: Technology[] = [];
    const errors = validateProject(input);
    if (errors.length > 0) {
      return { errors };
    }
    const project = await Project.findOne({ where: { name: input.name } });
    if (project) {
      return { errors: [errorsMap().get(Errors.PROJECT_IS_CREATED)!] };
    }

    if (pictureUrls && pictureUrls.length > 0) {
      const actions = await pictureUrls.map((p) => addOrReturnPictureAsync(p));
      pictures = await Promise.all(actions);
    }

    if (technologyNames && technologyNames.length > 0) {
      const technologiesFromDb = await Technology.find({});
      technologies = technologiesFromDb.filter((t) =>
        technologyNames.includes(t.name)
      );
    }
    const newProject = await Project.create({
      name,
      description,
      status: status === "In develop" ? 0 : status === "Completed" ? 1 : 2,
      pictures,
      technologies,
    }).save();
    return { entity: newProject };
  }

  @Mutation(() => ProjectResponse)
  async updateProject(
    @Arg("input") input: ProjectInput,
    @Arg("id") id: number
  ): Promise<ProjectResponse> {
    const { name, description, status, pictureUrls, technologyNames } = input;
    let pictures: Picture[] = [];
    let technologies: Technology[] = [];
    const errors = validateProject(input);
    if (errors.length > 0) {
      return { errors };
    }
    const project = await Project.findOne(id, {
      relations: ["pictures", "technologies"],
    });
    const picturesFromDb = await Picture.find({
      where: { project },
    });
    const pictureUrlsFromDb = picturesFromDb.map((pic) => pic.publicLink);
    const technologiesFromDb = await Technology.find();

    if (pictureUrls && pictureUrls.length > 0) {
      if (pictureUrls.length > pictureUrlsFromDb.length) {
        const existedPicturesUrls = pictureUrlsFromDb.filter((pic) =>
          pictureUrls.includes(pic)
        );
        const newPicturesUrls = pictureUrls.filter(
          (pic) => !pictureUrlsFromDb.includes(pic)
        );
        if (existedPicturesUrls.length === 0) {
          const actions = await pictureUrlsFromDb.map((p) =>
            deletePictureAsync(p)
          );
          await Promise.all(actions);
        }
        const existedPictures = await Picture.find({
          where: { project },
        });
        const actions = await newPicturesUrls.map((p) =>
          addOrReturnPictureAsync(p)
        );
        const newPictures = await Promise.all(actions);
        const allPictures = existedPictures.concat(newPictures);

        pictures = allPictures;
      } else {
        const pictureUrlsToDelete = pictureUrlsFromDb.filter((pic) => {
          return !pictureUrls.includes(pic);
        });

        const actions = await pictureUrlsToDelete.map((p) =>
          deletePictureAsync(p)
        );
        await Promise.all(actions);
        pictures = await Picture.find({
          where: { project },
        });
      }
    } else if (pictureUrls.length === 0 && picturesFromDb.length > 0) {
      const actions = await pictureUrlsFromDb.map((p) => deletePictureAsync(p));
      await Promise.all(actions);
      pictures = await Picture.find({
        where: { project },
      });
    }

    if (technologyNames && technologyNames.length > 0) {
      technologies = technologiesFromDb.filter((t) =>
        technologyNames.includes(t.name)
      );
    }
    const numStatus =
      status === "In develop" ? 0 : status === "Completed" ? 1 : 2;

    project!.pictures = pictures;
    project!.technologies = technologies;
    project!.name = name;
    project!.description = description;
    project!.status = numStatus;
    await project?.save();

    return { entity: project };
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("id") id: number): Promise<Boolean> {
    const project = await Project.findOne(id);
    if (!project) {
      return false;
    }
    await Project.delete(project);
    return true;
  }
}
