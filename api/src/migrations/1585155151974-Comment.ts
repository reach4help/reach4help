import {MigrationInterface, QueryRunner} from "typeorm";

export class Comment1585155151974 implements MigrationInterface {
    name = 'Comment1585155151974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
              `CREATE TABLE "Comment" (
                                       id BIGSERIAL NOT NULL,
                                       commenter_id BIGINT NOT NULL,
                                       entity_id VARCHAR NOT NULL,
                                       email VARCHAR NOT NULL,
                                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                       updated_at TIMESTAMP
               );`,
        );    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Comment"`, undefined);
    }

}
