import { MinLength } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Category from "./Category";
import Icon from "./Icon";
import Project from "./Project";

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

  @ManyToOne(() => Category, (category) => category.technology, {
    nullable: true,
  })
  @JoinColumn()
  category: Category;

  @OneToOne(() => Icon, (icon) => icon.technology, { nullable: true })
  @JoinColumn()
  icon: Icon;

  @ManyToMany(() => Project, (project) => project.technologies)
  projects: Project;
}
