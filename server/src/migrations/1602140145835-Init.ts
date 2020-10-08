import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1602140145835 implements MigrationInterface {
    name = 'Init1602140145835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "picture" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "UQ_34e232c33ec4bea8acb8877e89d" UNIQUE ("url"), CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "status" integer NOT NULL, "iconId" integer, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "REL_e3d1122adde69ead6aa6566303" UNIQUE ("iconId"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "icon" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "color" character varying, CONSTRAINT "UQ_02b43282442e1716bdf056e540b" UNIQUE ("url"), CONSTRAINT "PK_7860777a14d73877ab2bf5a341c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technology" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "categoryId" integer, "iconId" integer, CONSTRAINT "UQ_0e93116dd895bf20badb82d3ed6" UNIQUE ("name"), CONSTRAINT "REL_20ae87a9632ee98f580af61f85" UNIQUE ("iconId"), CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "color" character varying, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_technologies_technology" ("projectId" integer NOT NULL, "technologyId" integer NOT NULL, CONSTRAINT "PK_13d3b19e83616b79587b14f4872" PRIMARY KEY ("projectId", "technologyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e780097cfd60204dd415ed7cf" ON "project_technologies_technology" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7d578080e24a8249d6754d67b" ON "project_technologies_technology" ("technologyId") `);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_e6e91d71caacb5a91dbdbc56e08" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_e3d1122adde69ead6aa65663032" FOREIGN KEY ("iconId") REFERENCES "icon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology" ADD CONSTRAINT "FK_cf9e9c614e7c684bdb2693787a1" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology" ADD CONSTRAINT "FK_20ae87a9632ee98f580af61f852" FOREIGN KEY ("iconId") REFERENCES "icon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" ADD CONSTRAINT "FK_2e780097cfd60204dd415ed7cfd" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" ADD CONSTRAINT "FK_c7d578080e24a8249d6754d67b4" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" DROP CONSTRAINT "FK_c7d578080e24a8249d6754d67b4"`);
        await queryRunner.query(`ALTER TABLE "project_technologies_technology" DROP CONSTRAINT "FK_2e780097cfd60204dd415ed7cfd"`);
        await queryRunner.query(`ALTER TABLE "technology" DROP CONSTRAINT "FK_20ae87a9632ee98f580af61f852"`);
        await queryRunner.query(`ALTER TABLE "technology" DROP CONSTRAINT "FK_cf9e9c614e7c684bdb2693787a1"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_e3d1122adde69ead6aa65663032"`);
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_e6e91d71caacb5a91dbdbc56e08"`);
        await queryRunner.query(`DROP INDEX "IDX_c7d578080e24a8249d6754d67b"`);
        await queryRunner.query(`DROP INDEX "IDX_2e780097cfd60204dd415ed7cf"`);
        await queryRunner.query(`DROP TABLE "project_technologies_technology"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "technology"`);
        await queryRunner.query(`DROP TABLE "icon"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "picture"`);
    }

}
