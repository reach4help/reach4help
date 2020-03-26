import { MigrationInterface, QueryRunner } from 'typeorm';

export class Authentication1585167427881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "authentication"
         (
             id                 BIGSERIAL                NOT NULL,
             type               VARCHAR                  NOT NULL,
             access_tokens_hash TEXT                     NOT NULL,
             expiration_time    TIMESTAMP WITH TIME ZONE NOT NULL,
             last_activity      TIMESTAMP WITH TIME ZONE NOT NULL,
             created_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
             updated_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "authentication"`);
  }

}
