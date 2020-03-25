import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1584965691785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
        `CREATE TABLE "user"
         (
             id                BIGSERIAL NOT NULL,
             authentication_id BIGINT    NOT NULL,
             contact_id        BIGINT    NOT NULL,
             address_id        BIGINT    NOT NULL,
             username          VARCHAR   NOT NULL,
             first_name        VARCHAR   NOT NULL,
             middle_name       VARCHAR   NOT NULL,
             last_name         VARCHAR   NOT NULL,
             created_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
             updated_at        TIMESTAMP WITH TIME ZONE
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}
