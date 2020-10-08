import { IsUrl } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Project from "./Project";

@ObjectType()
@Entity()
export default class Picture extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @IsUrl()
  @Field(() => String)
  @Column({ unique: true })
  url!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field({ defaultValue: 0, nullable: true })
  primary: number;

  @ManyToOne(() => Project, (project) => project.pictures, {
    onDelete: "CASCADE",
  })
  project: Project;
}
