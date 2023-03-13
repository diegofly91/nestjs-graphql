import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos';
import { User } from '@/modules/user/entities';
import { AuthGuard, LoginValidateGuard } from '../guards/';
//import { CreateUserDto } from '@/modules/user/dtos';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query()
    @UseGuards(AuthGuard)
    userCurrent(@Context('user') user: User) {
        return user;
    }

    @UseGuards(LoginValidateGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginUser(@Args('input') { username }: LoginUserDto) {
        return await this.authService.payloadData(username);
    }
}
