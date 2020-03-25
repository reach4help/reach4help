import { MigrationInterface, QueryRunner } from 'typeorm';

export class Contact1585167847390 implements MigrationInterface {
  name = 'Contact1585167847390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "contact"
         (
             id          BIGSERIAL    NOT NULL,
             email       VARCHAR(320) NOT NULL,
             phone       VARCHAR(15)  NOT NULL,
             created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updated_at  TIMESTAMP
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "contact"`, undefined);
  }

}
