import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories';
import { UserResolver } from './resolvers';
import { UserService } from './services';
import { AuthModule } from '../auth';
import { RoleRepository } from '../role/repositories';
import { RoleService } from '../role/services';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([UserRepository, RoleRepository])],
    providers: [UserService, UserResolver, RoleService],
    exports: [UserService],
})
export class UserModule {}
