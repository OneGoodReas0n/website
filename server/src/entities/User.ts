import { Matches } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Matches(/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9])(.{6,})$/gm, {
    message: "Password is invalid",
  })
  @Column()
  password!: string;
}
