import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserBigSerial1585152533865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "country" (
                id BIGSERIAL NOT NULL,
                name VARCHAR NOT NULL,
                code VARCHAR(3) NOT NULL,
                email VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "country"`, undefined);
  }

}
