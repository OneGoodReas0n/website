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

@ObjectType()
@Entity()
export default class Picture extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  publicLink!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @OneToOne(() => Technology, (tech) => tech.picture)
  technology: Technology;

  @ManyToOne(() => Project, (tech) => tech.pictures)
  project: Project;
}
