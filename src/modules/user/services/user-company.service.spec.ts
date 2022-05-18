import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyService } from '../services';
import { UserCompanyRepository } from '../repositories';

describe('UserCompanyService', () => {
    let userCompanyService;
    let userCompanyRepository;

    const mockUserCompanyRepository = () => ({
        getUserCompanyByUserId: jest.fn(),
        createUserCompany: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserCompanyService,
                {
                    provide: UserCompanyRepository,
                    useFactory: mockUserCompanyRepository,
                },
            ],
        }).compile();

        userCompanyService = await module.get<UserCompanyService>(UserCompanyService);
        userCompanyRepository = await module.get<UserCompanyRepository>(UserCompanyRepository);
    });

    describe('createuserCompany', () => {
        it('should save a userCompany in the database', async () => {
            userCompanyRepository.createUserCompany.mockResolvedValue('someUserCompany');
            expect(userCompanyRepository.createUserCompany).not.toHaveBeenCalled();

            const result = await userCompanyService.createUserCompany(1, 2);

            expect(userCompanyRepository.createUserCompany).toHaveBeenCalledWith(1,2);
            expect(result).toEqual('someUserCompany');
        });
    });

    describe('getUserCompanyByUserId', () => {
        it('should get userCompany by UserId', async () => {
            userCompanyRepository.getUserCompanyByUserId.mockResolvedValue('someProducts');

            expect(userCompanyRepository.getUserCompanyByUserId).not.toHaveBeenCalled();

            const result = await userCompanyService.getUserCompanyByUserId(1);
            expect(userCompanyRepository.getUserCompanyByUserId).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
        });
    });
});
