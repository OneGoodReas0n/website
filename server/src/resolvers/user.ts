import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import User from "../entities/User";
import { Context } from "../types";
import {} from "uuid";
import argon from "argon2";
import { validateLogin, Errors, errorsMap } from "../utils/validator";

@ObjectType()
export class FieldError {
  @Field()
  name: string;
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
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
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateLogin(email, password);
    if (errors.length > 0) {
      return { errors };
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [errorsMap().get(Errors.INVALID_CREDENTIALS)!],
      };
    }
    const valid = await argon.verify(user.password, password);
    if (!valid) {
      return {
        errors: [errorsMap().get(Errors.INVALID_CREDENTIALS)!],
      };
    }

    process.env.NODE_ENV !== "test" ? (req.session.userId = user.id) : "";

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateLogin(email, password);
    if (errors.length > 0) {
      return { errors };
    }

    const hashedPassword = await argon.hash(password);
    const currentUser = await User.findOne({ where: { email } });

    if (currentUser) {
      return {
        errors: [errorsMap().get(Errors.EMAIL_IN_USE)!],
      };
    }

    const user = await User.create({ email, password: hashedPassword }).save();

    process.env.NODE_ENV !== "test" ? (req.session.userId = user.id) : "";
    return {
      user,
    };
  }
}
