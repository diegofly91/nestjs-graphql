import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate({ username, password }: LoginUserDto): Promise<any> {
        const user = await this.authService.validateUser({ username, password });
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
