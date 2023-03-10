import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services';
import { Status } from '../../shared/enums';

describe('UserService', () => {
    let userService;

    const mockUserRepository = {
        createUser: jest.fn().mockImplementation((dto) => {
            return {
                id: Date.now(),
                ...dto,
            };
        }),
        getUsers: jest.fn().mockImplementation(() => {
            return [];
        }),
        getUserById: jest.fn().mockImplementation((id) => {
            const dto = {
                username: 'diegofly91',
                password: '',
                status: Status.PREACTIVE,
                roleId: 1,
            };
            return {
                id,
                ...dto,
            };
        }),
        deleteUser: jest.fn().mockImplementation((id) => {
            return {
                id,
                status: Status.DELETED,
            };
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: 'UserRepositoryInterface',
                    useValue: mockUserRepository,
                },
            ],
        }).compile();
        userService = await module.get<UserService>(UserService);
    });

    describe('createuser', () => {
        it('should save a user in the database', async () => {
            const dto = {
                username: 'diegofly91',
                password: 'diegofl91',
                status: Status.PREACTIVE,
                roleId: 1,
            };
            expect(await userService.createUser(dto)).toEqual({
                id: expect.any(Number),
                ...dto,
            });

            expect(mockUserRepository.createUser).toHaveBeenCalledWith(dto);

            expect(await userService.createUser(dto)).toEqual({
                id: expect.any(Number),
                ...dto,
            });

            expect(mockUserRepository.createUser).toHaveBeenCalledWith(dto);
        });
    });

    describe('getUsers', () => {
        it('should get all users', async () => {
            expect(await userService.getUsers()).toEqual([]);

            expect(mockUserRepository.getUsers).toHaveBeenCalled();
        });
    });

    describe('getUserById', () => {
        it('should retrieve a user with an ID', async () => {
            expect(await userService.getUserById(1)).toEqual({
                id: 1,
                username: expect.any(String),
                status: expect.any(String),
                password: expect.any(String),
                roleId: expect.any(Number),
            });

            expect(mockUserRepository.getUserById).toHaveBeenCalled();
        });
    });

    describe('deleteUser', () => {
        it('should delete user', async () => {
            expect(await userService.deleteUser(1)).toEqual({
                id: expect.any(Number),
                status: expect.any(String),
            });

            expect(mockUserRepository.deleteUser).toHaveBeenCalled();
        });
    });
});
