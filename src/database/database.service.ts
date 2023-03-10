import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
            type: 'postgres',
            host: config.get('DATABASE_HOST'),
            port: +config.get('DATABASE_PORT'),
            database: config.get('DATABASE_NAME'),
            username: config.get('DATABASE_USER'),
            password: config.get('DATABASE_PASS'),
            timezone: config.get('DATABASE_TIMEZONE'),
            autoLoadEntities: !!config.get('DATABASE_AUTOLOADENTITIES'),
            synchronize: !!config.get('DATABASE_AUTOLOADENTITIES'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + config.get('DATABASE_MIGRATIONS_DIR') + '/*.{.ts,.js}'],
        }),
        dataSourceFactory: async (options) => {
            const dataSource = await new DataSource(options).initialize();
            return dataSource;
        },
    }),
];
