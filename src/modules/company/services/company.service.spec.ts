import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '../services';
import { CompanyRepository } from '../repositories';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';

describe('CompanyService', () => {
    let companyService;
    let companyRepository;

    const mockCompanyRepository = () => ({
        getCompanyById: jest.fn(),
        getCompaniesAll: jest.fn(),
        createCompany: jest.fn(),
        updateCompany: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                {
                    provide: CompanyRepository,
                    useFactory: mockCompanyRepository,
                },
            ],
        }).compile();

        companyService = await module.get<CompanyService>(CompanyService);
        companyRepository = await module.get<CompanyRepository>(CompanyRepository);
    });

    describe('createcompany', () => {
        it('should save a company in the database', async () => {
            companyRepository.createCompany.mockResolvedValue('someCompany');
            expect(companyRepository.createCompany).not.toHaveBeenCalled();

            const createcompanyDto: CreateCompanyDto = {
                name: 'company prueba',
                description: 'empresa del barzal',
                address: 'libreros',
                isActive: true,
            };

            const result = await companyService.createCompany(createcompanyDto);

            expect(companyRepository.createCompany).toHaveBeenCalledWith(createcompanyDto);
            expect(result).toEqual('someCompany');
        });
    });

    describe('updateCompany', () => {
        it('should save a company in the database', async () => {
            companyRepository.updateCompany.mockResolvedValue('someCompany');
            expect(companyRepository.updateCompany).not.toHaveBeenCalled();

            const createcompanyDto: UpdateCompanyDto = {
                name: 'company prueba',
                description: 'empresa del barzal',
                address: 'libreros',
                isActive: true,
            };

            const result = await companyService.updateCompany(1, createcompanyDto);

            expect(companyRepository.updateCompany).toHaveBeenCalledWith(1, createcompanyDto);
            expect(result).toEqual('someCompany');
        });
    });

    describe('getCompanyById', () => {
        it('should get company by UserId', async () => {
            companyRepository.getCompanyById.mockResolvedValue('someProducts');

            expect(companyRepository.getCompanyById).not.toHaveBeenCalled();

            const result = await companyService.getCompanyById(1);
            expect(companyRepository.getCompanyById).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
        });
    });

    describe('getCompaniesAll', () => {
        it('should get company by Email', async () => {
            companyRepository.getCompaniesAll.mockResolvedValue('someProducts');

            expect(companyRepository.getCompaniesAll).not.toHaveBeenCalled();

            const result = await companyService.getCompaniesAll('email@gmail.com');
            expect(companyRepository.getCompaniesAll).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
        });
    });
});
