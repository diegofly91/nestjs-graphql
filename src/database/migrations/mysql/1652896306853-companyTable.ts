import { MigrationInterface, QueryRunner } from 'typeorm';

export class companyTable1652896306853 implements MigrationInterface {
    name = 'companyTable1652896306853';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` varchar(150) NULL, \`address\` varchar(100) NOT NULL, \`logo\` varchar(240) NULL, \`is_active\` int NULL DEFAULT '1', \`deleted\` int NULL DEFAULT '0', \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`companies\``);
    }
}
