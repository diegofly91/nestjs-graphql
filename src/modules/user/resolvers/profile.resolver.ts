import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile, User } from '../entities';
import { ProfileService } from '../services';
import { AuthGuard, RolesGuard } from '@/modules/auth/guards';
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';

@UseGuards(RolesGuard)
@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {}

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @Query(() => Profile, { nullable: true })
    async getProfileUserById(@Context('user') user: User): Promise<Profile> {
        return await this.profileService.getProfileUserById(user.id);
    }

    @Query(() => Profile, { nullable: true })
    async getProfileByEmail(email: string): Promise<Profile> {
        return await this.profileService.getProfileByEmail(email);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Profile, { nullable: true })
    async createProfileUser(@Context('user') user: User, @Args('input') input: CreateProfileUserDto): Promise<Profile> {
        return await this.profileService.createProfileUser(user.id, input);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @Mutation(() => Profile)
    async updateProfileUser(@Context('user') user: User, @Args('input') input: UpdateProfileUserDto): Promise<Profile> {
        return await this.profileService.updateProfileUser(user.id, input);
    }
}
