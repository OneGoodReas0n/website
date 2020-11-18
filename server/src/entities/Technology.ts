import { MinLength } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Project from "./Project";

@ObjectType()
@Entity()
export default class Technology extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @MinLength(3, { message: "Technology name should be longer than 2 symbols" })
  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @Field(() => String)
  @Column()
  iconName: string;

  @Field(() => Number)
  @Column()
  category: number;

  @ManyToMany(() => Project, (project) => project.technologies)
  projects: Project;
}
