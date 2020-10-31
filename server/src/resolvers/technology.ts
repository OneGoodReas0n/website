import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import Technology from "../entities/Technology";
import { isAuth } from "../middleware/isAuth";
import { Errors, errorsMap, validateTechnology } from "../utils/validator";
import { GenericResponse } from "./types";
import Icon from "../entities/Icon";
import Category from "../entities/Category";

@InputType()
class CategoryInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  color?: string;
}

@InputType()
export class TechInput {
  @Field()
  name: string;
  @Field(() => CategoryInput)
  category: CategoryInput;
  @Field()
  icon: string;
}

@ObjectType()
class TechResponse extends GenericResponse(Technology) {}

@Resolver(Technology)
export default class TechnologyResolver {
  @FieldResolver(() => Icon, { nullable: true })
  async icon(@Root() technology: Technology) {
    const tech = await Technology.findOne({
      where: { id: technology.id },
      relations: ["icon"],
    });
    return tech?.icon;
  }

  @FieldResolver(() => Category, { nullable: true })
  async category(@Root() technology: Technology) {
    const tech = await Technology.findOne({
      where: { id: technology.id },
      relations: ["category"],
    });
    return tech?.category;
  }

  @Query(() => Technology, { nullable: true })
  async getTechnology(@Arg("id") id: number): Promise<Technology | null> {
    const technology = await Technology.findOne(id);
    if (!technology) {
      return null;
    }
    return technology;
  }

  @Query(() => [Technology])
  async getTechnologies(): Promise<Technology[]> {
    const technologies = await Technology.find({});
    return technologies;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => TechResponse, { nullable: true })
  async createTechnology(
    @Arg("input") input: TechInput
  ): Promise<TechResponse> {
    const errors = validateTechnology(input);
    if (errors.length > 0) {
      return { errors };
    }

    const tech = await Technology.findOne({ where: { name: input.name } });
    if (tech) {
      return { errors: [errorsMap().get(Errors.TECH_IS_CREATED)!] };
    }

    let icon = new Icon();
    const iconFromDb = await Icon.findOne({
      where: { name: input.icon },
    });
    if (iconFromDb) {
      icon = iconFromDb;
    } else {
      icon = await Icon.create({
        name: input.icon,
      }).save();
    }

    let category = new Category();
    const categoryFromDb = await Category.findOne({
      where: { name: input.category.name },
    });
    if (categoryFromDb) {
      category = categoryFromDb;
    } else {
      category = await Category.create({
        name: input.category.name,
        color: input.category.color,
      }).save();
    }

    const technology = await Technology.create({
      name: input.name,
      icon,
      category,
    }).save();
    return { entity: technology };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => TechResponse, { nullable: true })
  async updateTechnology(
    @Arg("id") id: number,
    @Arg("input") input: TechInput
  ): Promise<TechResponse> {
    let tech: Technology = Technology.create();
    const errors = validateTechnology(input);
    if (errors.length > 0) {
      return { errors };
    }
    const technology = await Technology.findOne({
      where: { id },
      relations: ["icon", "category"],
    });
    if (!technology) {
      return { errors: [errorsMap().get(Errors.TECH_IS_NOT_FOUND)!] };
    }
    if (technology.name !== input.name) {
      technology.name = input.name;
    }

    if (technology.icon.name !== input.icon) {
      const icon = await Icon.findOne({ where: { name: input.icon } });
      if (icon) {
        technology.icon = icon;
      } else {
        technology.icon = await Icon.create({ name: input.icon }).save();
      }
    }

    if (
      technology.category.name !== input.category.name ||
      technology.category.color !== input.category.color
    ) {
      const category = await Category.findOne({
        where: { name: input.category.name },
      });
      if (category) {
        technology.category = category;
      } else {
        technology.category = await Category.create({
          name: input.icon,
        }).save();
      }
    }

    tech = await Technology.save(technology);
    return { entity: tech };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async deleteTechnology(@Arg("id") id: number): Promise<Boolean> {
    const technology = await Technology.findOne(id);
    if (!technology) {
      return false;
    }
    await Technology.delete(id);
    return true;
  }
}
