import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, ProfileRepository, UserCompanyRepository } from './repositories';
import { UserResolver, ProfileResolver, UserCompanyResolver } from './resolvers';
import { UserService, ProfileService, UserCompanyService } from './services';
import { CompanyRepository } from '../company/repositories';
import { CompanyService } from '../company/services';
import { AuthModule } from '../auth';
import { RoleRepository } from '../role/repositories';
import { RoleService } from '../role/services';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            UserRepository,
            ProfileRepository,
            RoleRepository,
            UserCompanyRepository,
            CompanyRepository,
        ]),
    ],
    providers: [
        UserService,
        UserCompanyService,
        ProfileService,
        CompanyService,
        UserCompanyResolver,
        UserResolver,
        RoleService,
        ProfileResolver,
    ],
    exports: [UserService],
})
export class UserModule {}
