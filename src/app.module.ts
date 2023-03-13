import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQL } from './graphql';
import { DatabaseModule } from './database';
import { UserModule } from './modules/user';
import { RoleModule } from './modules/role';
import { AuthModule } from './modules/auth';
import { CompanyModule } from './modules/company';
import { SeederModule } from './modules/seeder';
import { DateScalar, Image } from './modules/shared/scalar';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        GraphQL,
        RoleModule,
        UserModule,
        CompanyModule,
        AuthModule,
        SeederModule,
    ],
    providers: [DateScalar],
})
export class AppModule {
    static host: string;
    static port: number;

    constructor(private readonly configService: ConfigService) {
        AppModule.host = this.configService.get('HOST');
        AppModule.port = +this.configService.get('PORT');
    }
}
