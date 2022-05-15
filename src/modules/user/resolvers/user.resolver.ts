import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserDto } from '../dtos';
import { User } from '../entities';
import { Role } from '@/modules/role/entities';
import { RoleService } from '@/modules/role/services';
import { UserService } from '../services';

//@UseGuards(RolesGuard)
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService, private readonly roleService: RoleService) {}

    //  @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    //  @UseGuards(AuthGuard)
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    //   @UseGuards(AuthGuard)
    @Query(() => User, { nullable: true })
    async getUserData(@Context('user') user: User): Promise<User> {
        return this.userService.getUserById(user.id);
    }

    //   @Roles(RoleType.SUPERUSER, RoleType.ADMIN, RoleType.CUSTOMER)
    @Query(() => User, { nullable: true })
    async getUser(@Args('id') id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUser(@Args('input') input: CreateUserDto): Promise<User> {
        return await this.userService.createUser(input);
    }

    // @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    //  @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async deleteUser(@Args('id') id: number): Promise<User> {
        return await this.userService.deleteUser(id);
    }

    @ResolveField('role', () => Role)
    async role(@Parent() user) {
        const { roleId } = user;
        return await this.roleService.getRoleById(roleId);
    }
}
