import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, Configuration } from '../../config';
import { UserRepository } from '@/modules/user/repositories';
import { UserService } from '../user/services';
import { AuthService } from './services';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategy, LocalStrategy } from './strategies';
import { RoleRepository } from '../role/repositories';
import { RoleService } from '../role/services';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guards';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([UserRepository, RoleRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get(Configuration.JWT_SECRET),
                signOptions: { expiresIn: '10d' },
            }),
        }),
    ],
    providers: [
        AuthService,
        UserService,
        RoleService,
        LocalStrategy,
        JwtStrategy,
        AuthResolver,
        {
            provide: APP_INTERCEPTOR,
            useClass: RolesGuard,
        },
    ],
    exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
