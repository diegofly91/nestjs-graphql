import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '../services';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';

describe('CompanyService', () => {
    let companyService;

    const mockCompanyRepository = () => ({
        getCompanyById: jest.fn().mockImplementation((id: number) => {
            return Promise.resolve({
                id,
                name: 'MY-COMPANY',
                description: '',
                address: '',
                isActive: true,
                deleted: false,
                createdAt: new Date(),
            });
        }),
        getCompaniesAll: jest.fn(),
        createCompany: jest.fn().mockImplementation((dto: CreateCompanyDto) => {
            return Promise.resolve({
                id: Date.now(),
                ...dto,
            });
        }),
        updateCompany: jest.fn().mockImplementation((id: number, dto: UpdateCompanyDto) => {
            return Promise.resolve({
                id,
                ...dto,
            });
        }),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                {
                    provide: 'CompanyRepositoryInterface',
                    useFactory: mockCompanyRepository,
                },
            ],
        }).compile();

        companyService = await module.get<CompanyService>(CompanyService);
    });

    describe('createcompany', () => {
        it('should save a company in the database', async () => {
            const createcompanyDto: CreateCompanyDto = {
                name: 'company prueba',
                description: 'empresa del barzal',
                address: 'libreros',
                isActive: true,
            };

            const result = await companyService.createCompany(createcompanyDto);

            expect(result).toEqual({
                id: expect.any(Number),
                ...createcompanyDto,
            });
        });
    });
    describe('updateCompany', () => {
        it('should save a company in the database', async () => {
            const createcompanyDto: UpdateCompanyDto = {
                name: 'company prueba',
                description: 'empresa del barzal',
                address: 'libreros',
                isActive: true,
            };
            const id = 1;

            const result = await companyService.updateCompany(id, createcompanyDto);

            expect(result).toEqual({
                id,
                ...createcompanyDto,
            });
        });
    });
    describe('getCompanyById', () => {
        it('should get company by UserId', async () => {
            const id = 1;

            const result = await companyService.getCompanyById(id);
            expect(result).toEqual({
                id,
                name: expect.any(String),
                description: expect.any(String),
                address: expect.any(String),
                //logo: expect.any(String),
                isActive: expect.any(Boolean),
                deleted: expect.any(Boolean),
                createdAt: expect.any(Date),
            });
        });
    });
    /*


    describe('getCompaniesAll', () => {
        it('should get company by Email', async () => {
            companyRepository.getCompaniesAll.mockResolvedValue('someProducts');

            expect(companyRepository.getCompaniesAll).not.toHaveBeenCalled();

            const result = await companyService.getCompaniesAll('email@gmail.com');
            expect(companyRepository.getCompaniesAll).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
        });
    });
    */
});
