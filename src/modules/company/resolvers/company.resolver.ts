import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';
import { Company } from '../entities';
import { CompanyService } from '../services';
import { AuthGuard, RolesGuard } from '../../auth/guards/';
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';
import { OptionDto, PaginationArgs } from '@/modules/shared/dtos';

@UseGuards(RolesGuard)
@Resolver(() => Company)
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService) {}

    @Roles(RoleType.SUPERUSER)
    @Query(() => [Company])
    public async getCompaniesAll(): Promise<Company[]> {
        return this.companyService.getCompaniesAll();
    }

    @Roles(RoleType.SUPERUSER)
    @UsePipes(new ValidationPipe())
    @Query(() => [Company])
    public async getCompanies(
        @Args('options') options: OptionDto,
        @Args('pagination') pagination: PaginationArgs,
    ): Promise<Company[]> {
        return this.companyService.getCompanies(options, pagination);
    }

    @Query(() => Company, { nullable: true })
    public async getCompanyById(@Args('id') id: number): Promise<Company> {
        return this.companyService.getCompanyById(id);
    }

    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Company, { nullable: true })
    public async createCompany(@Args('input') input: CreateCompanyDto): Promise<Company> {
        return await this.companyService.createCompany(input);
    }

    @Roles(RoleType.ADMIN, RoleType.SUPERUSER)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Company)
    public async updateCompany(@Args('id') id: number, @Args('input') input: UpdateCompanyDto): Promise<Company> {
        return await this.companyService.updateCompany(id, input);
    }

    @Roles(RoleType.SUPERUSER)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Company)
    public async deleteCompany(@Args('id') id: number): Promise<Company> {
        return await this.companyService.deleteCompany(id);
    }
}
