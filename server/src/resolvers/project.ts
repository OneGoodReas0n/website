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
  UseMiddleware,
} from "type-graphql";
import { GenericResponse } from "./types";
import { validateProject, errorsMap, Errors } from "../utils/validator";
import Picture from "../entities/Picture";
import Technology from "../entities/Technology";
import { isAuth } from "../middleware/isAuth";
import ProjectLink from "../entities/ProjectLink";

const addOrReturnPictureAsync = async (obj: PictureObj): Promise<Picture> => {
  return new Promise(async (resolve) => {
    const picture = await Picture.findOne({
      where: { url: obj.url },
    });
    if (picture) {
      resolve(picture);
    } else {
      const newPicture = await Picture.create({
        url: obj.url,
        primary: obj.primary,
      }).save();
      resolve(newPicture);
    }
  });
};

const deletePictureAsync = async (pictureLink: string): Promise<Boolean> => {
  const picture = await Picture.findOne({
    where: { url: pictureLink },
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
class PictureObj {
  @Field(() => String)
  url: string;
  @Field(() => Number, { nullable: true })
  primary?: number;
}

@InputType()
class LinkObj {
  @Field(() => String)
  demo: string;
  @Field(() => String)
  source_code: string;
}

@InputType()
export class ProjectInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field()
  status: "In develop" | "Completed" | "Planned";
  @Field(() => [PictureObj], { nullable: true })
  pictures: PictureObj[];
  @Field(() => [String], { nullable: true })
  technologyNames: string[];
  @Field(() => LinkObj)
  link: LinkObj;
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

  @FieldResolver(() => ProjectLink)
  async link(@Root() project: Project) {
    const link = await ProjectLink.findOne({
      where: { project },
    });
    return link;
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

  @UseMiddleware(isAuth)
  @Mutation(() => ProjectResponse)
  async createProject(
    @Arg("input") input: ProjectInput
  ): Promise<ProjectResponse> {
    const {
      name,
      description,
      status,
      pictures,
      technologyNames,
      link,
    } = input;
    let newPictures: Picture[] = [];
    let technologies: Technology[] = [];
    const errors = validateProject(input);

    if (errors.length > 0) {
      return { errors };
    }
    const project = await Project.findOne({ where: { name: input.name } });

    if (project) {
      return { errors: [errorsMap().get(Errors.PROJECT_IS_CREATED)!] };
    }

    if (pictures.length > 0) {
      const actions = await pictures.map((p) => addOrReturnPictureAsync(p));
      newPictures = await Promise.all(actions);
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
      technologies,
      status: status === "In develop" ? 0 : status === "Completed" ? 1 : 2,
    }).save();

    const promises = newPictures.map(async (pic) => {
      pic.project = newProject;
      await pic.save();
    });

    await Promise.all(promises);

    await ProjectLink.create({
      demo: link.demo,
      source_code: link.source_code,
      project: newProject,
    }).save();

    return { entity: newProject };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ProjectResponse)
  async updateProject(
    @Arg("input") input: ProjectInput,
    @Arg("id") id: number
  ): Promise<ProjectResponse> {
    const {
      name,
      description,
      status,
      pictures,
      technologyNames,
      link,
    } = input;
    let pictureArr: Picture[] = [];
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
    const pictureUrlsFromDb = picturesFromDb.map((pic) => pic.url);
    const technologiesFromDb = await Technology.find();

    if (pictures.length > 0) {
      if (pictures.length > pictureUrlsFromDb.length) {
        const pictureUrls: string[] = pictures.map((p) => p.url);
        const existedPicturesUrls: string[] = pictureUrlsFromDb.filter((pic) =>
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
        const picturesToAdd = pictures.filter((p) =>
          newPicturesUrls.includes(p.url)
        );
        const actions = picturesToAdd.map(
          async (p) => await addOrReturnPictureAsync(p)
        );
        const newPictures = await Promise.all(actions);
        const allPictures = existedPictures.concat(newPictures);

        pictureArr = allPictures;
      } else {
        const pictureUrls = pictures.map((p) => p.url);
        const pictureUrlsToDelete = pictureUrlsFromDb.filter((pic) => {
          return !pictureUrls.includes(pic);
        });

        const actions = await pictureUrlsToDelete.map((p) =>
          deletePictureAsync(p)
        );
        await Promise.all(actions);
        pictureArr = await Picture.find({
          where: { project },
        });
      }
    } else if (pictures.length === 0 && picturesFromDb.length > 0) {
      const actions = await pictureUrlsFromDb.map((p) => deletePictureAsync(p));
      await Promise.all(actions);
      pictureArr = await Picture.find({
        where: { project },
      });
    }

    if (technologyNames && technologyNames.length > 0) {
      technologies = technologiesFromDb.filter((t) =>
        technologyNames.includes(t.name)
      );
    }

    if (!link.source_code || !link.demo) {
      return {
        errors: [errorsMap().get(Errors.PROJECT_LINKS_ARE_UNDEFINDED)!],
      };
    }

    const currentLink = await ProjectLink.findOne({
      where: { project: project?.id },
    });
    if (currentLink) {
      currentLink.demo = link.demo;
      currentLink.source_code = link.source_code;
    }

    const numStatus =
      status === "In develop" ? 0 : status === "Completed" ? 1 : 2;

    project!.pictures = pictureArr;
    project!.technologies = technologies;
    project!.name = name;
    project!.description = description;
    project!.status = numStatus;
    project!.link = currentLink!;
    await project?.save();

    return { entity: project };
  }

  @UseMiddleware(isAuth)
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
