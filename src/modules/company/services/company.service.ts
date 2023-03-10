import { Injectable, Inject } from '@nestjs/common';
import { CompanyRepository } from '../repositories';
import { Company } from '../entities';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';

@Injectable()
export class CompanyService {
    constructor(
        @Inject('CompanyRepositoryInterface')
        private readonly companyRepository: CompanyRepository<Company>,
    ) {}

    async getCompaniesAll(): Promise<Company[]> {
        return await this.companyRepository.getCompaniesAll();
    }

    async getCompanyById(companyId: number): Promise<Company> {
        return await this.companyRepository.getCompanyById(companyId);
    }

    async getCompanyByUserId(userId: number): Promise<Company> {
        return await this.companyRepository.getCompanyByUserId(userId);
    }

    async createCompany(dto: CreateCompanyDto): Promise<Company> {
        return await this.companyRepository.createCompany(dto);
    }

    async updateCompany(companyId: number, dto: UpdateCompanyDto): Promise<Company> {
        return await this.companyRepository.updateCompany(companyId, dto);
    }

    async deleteCompany(companyId: number): Promise<Company> {
        return await this.companyRepository.deleteCompany(companyId);
    }
}
