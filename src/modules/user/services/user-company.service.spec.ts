import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyService } from '../services';
import { UserCompanyRepository } from '../repositories';
import { UserCompany } from '../entities';
describe('UserCompanyService', () => {
    let userCompanyService;

    const mockUserCompanyRepository = () => ({
        getUserCompanyByUserId: jest.fn().mockImplementation((id) => {
            return Promise.resolve({
                id: Date.now(),
                userId: id,
                companyId: 3,
            });
        }),
        createUserCompany: jest.fn().mockImplementation((userId, companyId) => {
            return Promise.resolve(true);
        }),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserCompanyService,
                {
                    provide: 'UserCompanyRepositoryInterface',
                    useFactory: mockUserCompanyRepository,
                },
            ],
        }).compile();

        userCompanyService = await module.get<UserCompanyService>(UserCompanyService);
    });

    describe('createuserCompany', () => {
        it('should save a userCompany in the database', async () => {
            const userId = 1;
            const companyId = 2;
            expect(await userCompanyService.createUserCompany(userId, companyId)).toEqual(true);
        });
    });

    describe('getUserCompanyByUserId', () => {
        it('should get userCompany by UserId', async () => {
            const userId = 1;
            expect(await userCompanyService.getUserCompanyByUserId(userId)).toEqual({
                id: expect.any(Number),
                userId,
                companyId: expect.any(Number),
            });
        });
    });
});
