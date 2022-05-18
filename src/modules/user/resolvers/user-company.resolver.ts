import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCompany } from '../entities';
import { UserCompanyService } from '../services';
import { AuthGuard, RolesGuard } from '@/modules/auth/guards';
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';

@UseGuards(RolesGuard)
@Resolver(() => UserCompany)
export class UserCompanyResolver {
    constructor(private readonly userCompanyService: UserCompanyService) {}

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @Query(() => UserCompany, { nullable: true })
    async getUserCompanyByUserId(@Args('userId') userId: number): Promise<UserCompany> {
        return await this.userCompanyService.getUserCompanyByUserId(userId);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => UserCompany, { nullable: true })
    async createUserCompany(@Args('userId') userId: number, @Args('companyId') companyId: number): Promise<boolean> {
        return await this.userCompanyService.createUserCompany(userId, companyId);
    }
}
