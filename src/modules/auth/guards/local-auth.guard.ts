import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctxRequest = GqlExecutionContext.create(context).getContext().req;
        await super.logIn(ctxRequest);
        return ctxRequest ? true : false;
    }
}
