import { MigrationInterface, QueryRunner } from "typeorm";

export class addSecundaryPhone1680697306912 implements MigrationInterface {
    name = 'addSecundaryPhone1680697306912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD "secundary_phone" character varying(11)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "secundary_phone"`);
    }

}
