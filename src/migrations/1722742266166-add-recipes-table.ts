import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipesTable1722742266166 implements MigrationInterface {
  name = 'AddRecipesTable1722742266166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "ingredients" character varying NOT NULL, "instructions" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recipes"`);
  }
}
