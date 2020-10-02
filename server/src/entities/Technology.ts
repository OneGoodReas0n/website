import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Picture from "./Picture";
import Project from "./Project";
import { MinLength } from "class-validator";

@ObjectType()
@Entity()
export default class Technology extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @MinLength(3, { message: "Technology name should be longer than 2 symbols" })
  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @OneToOne(() => Picture, (picture) => picture.technology, { nullable: true })
  @JoinColumn()
  picture: Picture;

  @ManyToMany(() => Project, (project) => project.technologies)
  projects: Project;
}
