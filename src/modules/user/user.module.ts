import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, ProfileRepository } from './repositories';
import { UserResolver, ProfileResolver } from './resolvers';
import { UserService, ProfileService } from './services';
import { AuthModule } from '../auth';
import { RoleRepository } from '../role/repositories';
import { RoleService } from '../role/services';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([UserRepository, ProfileRepository, RoleRepository])],
    providers: [UserService, ProfileService, UserResolver, RoleService, ProfileResolver],
    exports: [UserService],
})
export class UserModule {}
