import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1601628687408 implements MigrationInterface {
    name = 'Init1601628687408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technology" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "pictureId" integer, CONSTRAINT "UQ_0e93116dd895bf20badb82d3ed6" UNIQUE ("name"), CONSTRAINT "REL_d7995a81d7a399d41ab0e80deb" UNIQUE ("pictureId"), CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "picture" ("id" SERIAL NOT NULL, "publicLink" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "UQ_7e4d03f80dce1ee527b8cb1706a" UNIQUE ("publicLink"), CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_technologies_technology" ("projectId" integer NOT NULL, "technologyId" integer NOT NULL, CONSTRAINT "PK_13d3b19e83616b79587b14f4872" PRIMARY KEY ("projectId", "technologyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e780097cfd60204dd415ed7cf" ON "project_technologies_technology" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7d578080e24a8249d6754d67b" ON "project_technologies_technology" ("technologyId") `);
        await queryRunner.query(`ALTER TABLE "technology" ADD CONSTRAINT "FK_d7995a81d7a399d41ab0e80deb6" FOREIGN KEY ("pictureId") REFERENCES "picture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_e6e91d71caacb5a91dbdbc56e08" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" ADD CONSTRAINT "FK_2e780097cfd60204dd415ed7cfd" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" ADD CONSTRAINT "FK_c7d578080e24a8249d6754d67b4" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" DROP CONSTRAINT "FK_c7d578080e24a8249d6754d67b4"`);
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" DROP CONSTRAINT "FK_2e780097cfd60204dd415ed7cfd"`);
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_e6e91d71caacb5a91dbdbc56e08"`);
        await queryRunner.query(`ALTER TABLE "technology" DROP CONSTRAINT "FK_d7995a81d7a399d41ab0e80deb6"`);
        await queryRunner.query(`DROP INDEX "IDX_c7d578080e24a8249d6754d67b"`);
        await queryRunner.query(`DROP INDEX "IDX_2e780097cfd60204dd415ed7cf"`);
        await queryRunner.query(`DROP TABLE "project_technologies_technology"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "picture"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "technology"`);
    }

}