import { ICompany } from './company.interface';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';

export interface CompanyInterfaceRepository<ICompany> {
    getCompaniesAll(): Promise<ICompany[]>;
    getCompanyById(id: number): Promise<ICompany>;
    getCompanyByUserId(userId: number): Promise<ICompany>;
    createCompany(dto: CreateCompanyDto): Promise<ICompany>;
    updateCompany(companyId: number, dto: UpdateCompanyDto): Promise<ICompany>;
    deleteCompany(companyId: number): Promise<ICompany>;
}
