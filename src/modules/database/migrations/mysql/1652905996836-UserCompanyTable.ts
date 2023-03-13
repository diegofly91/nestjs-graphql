import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCompanyTable1652905996836 implements MigrationInterface {
    name = 'UserCompanyTable1652905996836';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`users_companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`company_id\` int NOT NULL, UNIQUE INDEX \`REL_ac4c935c0d2e9cbf0b6fe41d25\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users_companies\` ADD CONSTRAINT \`FK_ac4c935c0d2e9cbf0b6fe41d259\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users_companies\` ADD CONSTRAINT \`FK_986ef3d5c20e949236a2a9d7da9\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_companies\` DROP FOREIGN KEY \`FK_986ef3d5c20e949236a2a9d7da9\``);
        await queryRunner.query(`ALTER TABLE \`users_companies\` DROP FOREIGN KEY \`FK_ac4c935c0d2e9cbf0b6fe41d259\``);
        await queryRunner.query(`DROP INDEX \`REL_ac4c935c0d2e9cbf0b6fe41d25\` ON \`users_companies\``);
        await queryRunner.query(`DROP TABLE \`users_companies\``);
    }
}
