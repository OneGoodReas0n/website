import { Max, Min, MinLength } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Picture from "./Picture";
import Technology from "./Technology";
import ProjectLink from "./ProjectLink";

@ObjectType()
@Entity()
export default class Project extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @MinLength(3, { message: "Project name should be longer than 2 symbols" })
  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @MinLength(10, {
    message: "Project description should be longer than 10 symbols",
  })
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Min(0)
  @Max(2)
  @Field(() => Number)
  @Column()
  status: number;

  @OneToMany(() => Picture, (picture) => picture.project)
  pictures: Picture[];

  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable()
  technologies: Technology[];

  @OneToOne(() => ProjectLink, (link) => link.project)
  link: ProjectLink;
}
