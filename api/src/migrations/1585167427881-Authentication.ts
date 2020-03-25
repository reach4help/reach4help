import { MigrationInterface, QueryRunner } from 'typeorm';

export class Authentication1585167427881 implements MigrationInterface {
  name = 'Authentication1585167427881';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "authentication"
         (
             id                 BIGSERIAL NOT NULL,
             type               VARCHAR   NOT NULL,
             access_tokens_hash TEXT      NOT NULL,
             expiration_time    TIMESTAMP NOT NULL,
             last_activity      TIMESTAMP NOT NULL,
             created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updated_at         TIMESTAMP
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "authentication"`, undefined);
  }

}
