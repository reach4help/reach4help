import { MigrationInterface, QueryRunner } from 'typeorm';

export class Request1585154959923 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "request"
         (
             id           BIGSERIAL NOT NULL,
             requester_id BIGINT    NOT NULL,
             volunteer_id BIGINT,
             description  TEXT      NOT NULL,
             status       VARCHAR,
             created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updated_at   TIMESTAMP
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "request"`, undefined);
  }

}
