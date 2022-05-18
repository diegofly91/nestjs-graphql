import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';
import { Company } from '../entities';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
    async getCompaniesAll(): Promise<Company[]> {
        return await this.find();
    }

    async getCompanyById(id: number): Promise<Company> {
        const company = await this.findOne(id);
        if (!company) throw new NotFoundException('No existe la empresa');
        return company;
    }

    async createCompany(dto: CreateCompanyDto): Promise<Company> {
        const company = await this.create(dto);
        return await this.save(company);
    }

    async updateCompany(companyId: number, dto: UpdateCompanyDto): Promise<Company> {
        const company = await this.getCompanyById(companyId);
        const companyToUpdate = Object.assign(company, dto);
        return await this.save(companyToUpdate);
    }

    async deleteCompany(companyId: number): Promise<Company> {
        const company = await this.getCompanyById(companyId);
        await this.createQueryBuilder()
            .update(Company)
            .set({ deleted: true, isActive: false })
            .where('id = :id', { id: companyId })
            .execute();
        return company;
    }
}
