import {MigrationInterface, QueryRunner} from "typeorm";

export class profileTable1652834239502 implements MigrationInterface {
    name = 'profileTable1652834239502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`firstname\` varchar(60) NULL, \`lastname\` varchar(60) NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(20) NULL, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5b49bd22c967ce2829ca8f1772\` (\`email\`), UNIQUE INDEX \`REL_9e432b7df0d182f8d292902d1a\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_9e432b7df0d182f8d292902d1a2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_9e432b7df0d182f8d292902d1a2\``);
        await queryRunner.query(`DROP INDEX \`REL_9e432b7df0d182f8d292902d1a\` ON \`profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b49bd22c967ce2829ca8f1772\` ON \`profiles\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
    }

}
