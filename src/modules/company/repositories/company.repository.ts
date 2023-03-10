import { NotFoundException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';
import { Company } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyInterfaceRepository } from '../interfaces/company.repository.interface';

@Injectable()
export class CompanyRepository<Company> implements CompanyInterfaceRepository<Company> {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async getCompaniesAll(): Promise<Company[]> {
        return await this.companyRepository.createQueryBuilder('company').getMany();
    }

    async getCompanyById(id: number): Promise<Company> {
        const company = await this.companyRepository
            .createQueryBuilder('company')
            .where('company.id = :id', { id })
            .getOne();
        if (!company) throw new NotFoundException('No existe la empresa');
        return company;
    }

    async getCompanyByUserId(userId: number): Promise<Company> {
        return await this.companyRepository
            .createQueryBuilder('company')
            .innerJoinAndSelect('users_companies', 'userCompany', 'userCompany.company_id = company.id ')
            .where('userCompany.user_id = :userId', { userId })
            .getOne();
    }

    async createCompany(dto: CreateCompanyDto): Promise<Company> {
        const { raw } = await this.companyRepository.createQueryBuilder().insert().into(Company).values(dto).execute();
        return raw;
    }

    async updateCompany(companyId: number, dto: UpdateCompanyDto): Promise<Company> {
        const company = await this.getCompanyById(companyId);
        const companyToUpdate = Object.assign(company, dto);
        return await this.companyRepository.save(companyToUpdate);
    }

    async deleteCompany(companyId: number): Promise<Company> {
        const company = await this.getCompanyById(companyId);
        await this.companyRepository
            .createQueryBuilder()
            .update(Company)
            .set({ deleted: true, isActive: false })
            .where('id = :id', { id: companyId })
            .execute();
        return company;
    }
}
