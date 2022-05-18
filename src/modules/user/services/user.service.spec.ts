import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services';
import { UserRepository } from '../repositories';
import { Status } from '../../../shared/enums';

describe('UserService', () => {
    let userService;
    let userRepository;

    const mockUserRepository = () => ({
        getUsers: jest.fn(),
        createUser: jest.fn(),
        getUserById: jest.fn(),
        deleteUser: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useFactory: mockUserRepository,
                },
            ],
        }).compile();

        userService = await module.get<UserService>(UserService);
        userRepository = await module.get<UserRepository>(UserRepository);
    });

    describe('createuser', () => {
        it('should save a user in the database', async () => {
            userRepository.createUser.mockResolvedValue('someUser');
            expect(userRepository.createUser).not.toHaveBeenCalled();

            const createuserDto = {
                username: 'diegofly91',
                password: 'diegofl91',
                status: Status.PREACTIVE,
            };

            const result = await userService.createUser(createuserDto);

            expect(userRepository.createUser).toHaveBeenCalledWith(createuserDto);
            expect(result).toEqual('someUser');
        });
    });

    describe('getUsers', () => {
        it('should get all users', async () => {
            userRepository.getUsers.mockResolvedValue('someProducts');

            expect(userRepository.getUsers).not.toHaveBeenCalled();

            const result = await userService.getUsers();
            expect(userRepository.getUsers).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
        });
    });

    describe('getUserById', () => {
        it('should retrieve a user with an ID', async () => {
            const mockUser = {
                username: 'diegofly91',
                password: 'diegofl91',
                status: Status.PREACTIVE,
            };

            userRepository.getUserById.mockResolvedValue(mockUser);

            const result = await userService.getUserById(1);
            expect(result).toEqual(mockUser);

            expect(userRepository.getUserById).toHaveBeenCalledWith(1);
        });

        /*    it('throws an error User is not exists', () => {
               userRepository.getUserById.mockResolvedValue(NotFoundException);       
                expect(userService.getUserById(1)).rejects.toThrowError(NotFoundException);
        });*/
    });

    describe('deleteUser', () => {
        it('should delete user', async () => {
            userRepository.deleteUser.mockResolvedValue(1);
            expect(userRepository.deleteUser).not.toHaveBeenCalled();
            await userService.deleteUser(1);
            expect(userRepository.deleteUser).toHaveBeenCalledWith(1);
        });
    });
});
