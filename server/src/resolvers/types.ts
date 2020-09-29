import { ClassType, ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  name: string;
  @Field()
  field: string;
  @Field()
  message: string;
}

export function GenericResponse<T>(T: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => T, { nullable: true })
    entity?: T;
  }
  return PaginatedResponseClass;
}
