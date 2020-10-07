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

@InputType()
export class TechInput {
  @Field()
  name: string;
  @Field()
  iconPath: string;
  @Field({ nullable: true })
  color?: string;
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

  @UseMiddleware(isAuth)
  @Query(() => Technology, { nullable: true })
  async getOne(@Arg("name") name: string): Promise<Technology | null> {
    const technology = await Technology.findOne({ where: { name } });
    if (!technology) {
      return null;
    }
    return technology;
  }

  @Query(() => [Technology])
  async getAll(): Promise<Technology[]> {
    const technologies = await Technology.find({});
    return technologies;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => TechResponse, { nullable: true })
  async create(@Arg("input") input: TechInput): Promise<TechResponse> {
    const errors = validateTechnology(input);
    if (errors.length > 0) {
      return { errors };
    }

    const tech = await Technology.findOne({ where: { name: input.name } });
    if (tech) {
      return { errors: [errorsMap().get(Errors.TECH_IS_CREATED)!] };
    }
    const icon = await Icon.create({
      publicLink: input.iconPath,
      color: input.color,
    }).save();
    const technology = await Technology.create({
      name: input.name,
      icon,
    }).save();
    return { entity: technology };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => TechResponse, { nullable: true })
  async update(
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
      relations: ["icon"],
    });
    if (!technology) {
      return { errors: [errorsMap().get(Errors.TECH_IS_NOT_FOUND)!] };
    }
    if (technology.name !== input.name) {
      technology.name = input.name;
    }

    if (technology.icon.publicLink !== input.iconPath) {
      await Icon.update(technology.icon.id, {
        publicLink: input.iconPath,
      });
    }
    tech = await Technology.save(technology);
    return { entity: tech };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async delete(@Arg("id") id: number): Promise<Boolean> {
    const technology = await Technology.findOne(id);
    if (!technology) {
      return false;
    }
    await Technology.delete(id);
    return true;
  }
}
