import argon from "argon2";
import {
  Arg,
  Ctx,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Field,
  InputType,
} from "type-graphql";
import {} from "uuid";
import User from "../entities/User";
import { Context } from "../types";
import { Errors, errorsMap, validateUser } from "../utils/validator";
import { GenericResponse } from "./types";
import { COOKIE_NAME } from "../consts";

@ObjectType()
class UserResponse extends GenericResponse(User) {}

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne(req.session.userId);
    return user === undefined ? null : user;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: UserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateUser(input);
    if (errors.length > 0) {
      return { errors: errors };
    }
    const user = await User.findOne({ where: { email: input.email } });
    if (!user) {
      return {
        errors: [errorsMap().get(Errors.INVALID_CREDENTIALS)!],
      };
    }
    const valid = await argon.verify(user.password, input.password);
    if (!valid) {
      return {
        errors: [errorsMap().get(Errors.INVALID_CREDENTIALS)!],
      };
    }

    process.env.NODE_ENV !== "test" ? (req.session.userId = user.id) : "";

    return {
      entity: user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<Boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateUser(input);
    if (errors.length > 0) {
      return { errors };
    }

    const hashedPassword = await argon.hash(input.password);
    const currentUser = await User.findOne({ where: { email: input.email } });

    if (currentUser) {
      return {
        errors: [errorsMap().get(Errors.EMAIL_IN_USE)!],
      };
    }

    const user = await User.create({
      email: input.email,
      password: hashedPassword,
    }).save();

    process.env.NODE_ENV !== "test" ? (req.session.userId = user.id) : "";
    return {
      entity: user,
    };
  }
}
