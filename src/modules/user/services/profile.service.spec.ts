import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../services';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
describe('ProfileService', () => {
    let profileService;
    const newProfile: CreateProfileUserDto = {
        firstname: 'diego',
        lastname: 'libreros',
        email: 'postareservas@gmail.com',
        phone: '',
    };
    const mockProfileRepository = () => ({
        getProfileUserById: jest.fn().mockImplementation((userId: number) => {
            return Promise.resolve({
                id: Date.now(),
                userId,
                ...newProfile,
            });
        }),
        createProfileUser: jest.fn().mockImplementation((userId: number, dto: CreateProfileUserDto) => {
            return Promise.resolve({
                id: Date.now(),
                userId,
                ...dto,
            });
        }),
        //getProfileByEmail: jest.fn(),
        //createProfileUser: jest.fn(),
        //updateProfileUser: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProfileService,
                {
                    provide: 'ProfileRepositoryInterface',
                    useFactory: mockProfileRepository,
                },
            ],
        }).compile();

        profileService = await module.get<ProfileService>(ProfileService);
    });

    describe('getProfileByUserId', () => {
        it('should get profile by UserId', async () => {
            const userId = 1;
            const result = await profileService.getProfileUserById(userId);
            expect(result).toEqual({
                id: expect.any(Number),
                userId,
                firstname: expect.any(String),
                lastname: expect.any(String),
                email: expect.any(String),
                phone: expect.any(String),
            });
        });
    });
    describe('createprofile', () => {
        it('should save a profile in the database', async () => {
            const userId = 1;
            const createprofileDto: CreateProfileUserDto = {
                firstname: 'diego',
                lastname: 'libreros',
                email: 'postareservas@gmail.com',
                phone: '',
            };

            const result = await profileService.createProfileUser(userId, createprofileDto);

            expect(result).toEqual({
                id: expect.any(Number),
                userId,
                ...createprofileDto,
            });
        });
    });
    /*

    describe('updateProfile', () => {
        it('should save a profile in the database', async () => {
            profileRepository.updateProfileUser.mockResolvedValue('someProfile');
            expect(profileRepository.updateProfileUser).not.toHaveBeenCalled();

            const createprofileDto: UpdateProfileUserDto = {
                firstname: 'diego',
                lastname: 'libreros',
                email: 'postareservas@gmail.com',
                phone: '',
            };

            const result = await profileService.updateProfileUser(1, createprofileDto);

            expect(profileRepository.updateProfileUser).toHaveBeenCalledWith(1, createprofileDto);
            expect(result).toEqual('someProfile');
        });
    });

    describe('getProfileByEmail', () => {
        it('should get profile by Email', async () => {
            profileRepository.getProfileByEmail.mockResolvedValue('someProducts');

            expect(profileRepository.getProfileByEmail).not.toHaveBeenCalled();

            const result = await profileService.getProfileByEmail('email@gmail.com');
            expect(profileRepository.getProfileByEmail).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
        });
    });
    */
});
