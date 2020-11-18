import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
} from "typeorm";
import Project from "./Project";

@ObjectType()
@Entity()
export default class ProjectLink extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  demo: string;

  @Field(() => String)
  @Column()
  source_code: string;

  @OneToOne(() => Project, (project) => project.link, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  project: Project;
}
