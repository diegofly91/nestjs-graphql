import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos';
import { User } from '@/modules/user/entities';
import { AuthGuard } from '../guards/';
//import { CreateUserDto } from '@/modules/user/dtos';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query()
    @UseGuards(AuthGuard)
    userCurrent(@Context('user') user: User) {
        return user;
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginUser(@Args('input') input: LoginUserDto) {
        return await this.authService.validateUser(input);
    }
}
