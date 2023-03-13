import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos';

@Injectable()
export class LoginValidateGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const input: LoginUserDto = await ctx.getArgs().input;
        return await this.authService.validateUser(input);
    }
}
