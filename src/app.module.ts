import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, Configuration, GraphQL } from './config';
import { DatabaseModule } from './database';
import { UserModule } from './modules/user';
import { RoleModule } from './modules/role';
import { AuthModule } from './modules/auth';
import { CompanyModule } from './modules/company';

@Module({
    imports: [ConfigModule, GraphQL, UserModule, RoleModule, CompanyModule, DatabaseModule, AuthModule],
    providers: [],
})
export class AppModule {
    static host: string;
    static port: number;

    constructor(private readonly configService: ConfigService) {
        AppModule.host = this.configService.get(Configuration.HOST);
        AppModule.port = Number(this.configService.get(Configuration.PORT));
    }
}
