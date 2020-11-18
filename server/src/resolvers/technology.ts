import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import Technology from "../entities/Technology";
import { isAuth } from "../middleware/isAuth";
import { Errors, errorsMap, validateTechnology } from "../utils/validator";
import { GenericResponse } from "./types";

@InputType()
export class TechInput {
  @Field()
  name: string;
  @Field()
  category: number;
  @Field()
  iconName: string;
}

@ObjectType()
class TechResponse extends GenericResponse(Technology) {}

@Resolver(Technology)
export default class TechnologyResolver {
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

    const { name, category, iconName } = input;
    const tech = await Technology.findOne({ where: { name } });
    if (tech) {
      return { errors: [errorsMap().get(Errors.TECH_IS_CREATED)!] };
    }

    const technology = await Technology.create({
      name,
      iconName,
      category: category,
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

    const { category, iconName, name } = input;

    const technology = await Technology.findOne({
      where: { id },
    });
    if (!technology) {
      return { errors: [errorsMap().get(Errors.TECH_IS_NOT_FOUND)!] };
    }
    if (technology.name !== name) {
      technology.name = name;
    }

    if (technology.iconName !== iconName) {
      technology.iconName = iconName;
    }
    technology.category = category;

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
