import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import Project from "./Project";
import Technology from "./Technology";
import { IsUrl } from "class-validator";

@ObjectType()
@Entity()
export default class Picture extends BaseEntity {
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

  @OneToOne(() => Technology, (tech) => tech.picture, { onDelete: "CASCADE" })
  technology: Technology;

  @ManyToOne(() => Project, (project) => project.pictures, {
    onDelete: "CASCADE",
  })
  project: Project;
}
