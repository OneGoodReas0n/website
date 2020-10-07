import { IsUrl } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Project from "./Project";
import Technology from "./Technology";

@ObjectType()
@Entity()
export default class Icon extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @IsUrl()
  @Field(() => String)
  @Column({ unique: true })
  publicLink!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field(() => String, { nullable: true })
  color: string;

  @OneToOne(() => Technology, (tech) => tech.icon, { onDelete: "CASCADE" })
  technology: Technology;

  @OneToOne(() => Project, (project) => project.icon, {
    onDelete: "CASCADE",
  })
  project: Project;
}
