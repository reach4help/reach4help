import { MigrationInterface, QueryRunner } from 'typeorm';

export class Contact1585167847390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "contact"
         (
             id         BIGSERIAL    NOT NULL,
             email      VARCHAR(320),
             phone      VARCHAR(15),
             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
             updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "contact"`);
  }

}
