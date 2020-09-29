import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Project from "./Project";
import Picture from "./Picture";

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

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @OneToOne(() => Picture, (picture) => picture.technology, { nullable: true })
  @JoinColumn()
  picture: Picture;

  @ManyToOne(() => Project, (project) => project.technologies, {
    nullable: true,
  })
  project: Project;
}
