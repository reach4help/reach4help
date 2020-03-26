import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rating1585175842545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "rating"
         (
             id           BIGSERIAL NOT NULL,
             request_id   BIGINT    NOT NULL,
             to_user_id   BIGINT    NOT NULL,
             from_user_id BIGINT    NOT NULL,
             rating       INT       NOT NULL,
             created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
             updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "rating"`, undefined);
  }

}
