
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../services';
import { ProfileRepository } from '../repositories';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';

describe('ProfileService', () => {
    let profileService;
    let profileRepository;

    const mockProfileRepository = () => ({
        getProfileUserById: jest.fn(),
        getProfileByEmail: jest.fn(),
        createProfileUser: jest.fn(),
        updateProfileUser: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProfileService,
                {
                    provide: ProfileRepository,
                    useFactory: mockProfileRepository,
                },
            ],
        }).compile();

        profileService = await module.get<ProfileService>(ProfileService);
        profileRepository = await module.get<ProfileRepository>(ProfileRepository);
    });

    describe('createprofile', () => {
        it('should save a profile in the database', async () => {
            profileRepository.createProfileUser.mockResolvedValue('someProfile');
            expect(profileRepository.createProfileUser).not.toHaveBeenCalled();

            const createprofileDto: CreateProfileUserDto = {
                firstname: 'diego',
                lastname: 'libreros',
                email: 'postareservas@gmail.com',
                phone: null
            };

            const result = await profileService.createProfileUser(1,createprofileDto);

            expect(profileRepository.createProfileUser).toHaveBeenCalledWith(1,createprofileDto);
            expect(result).toEqual('someProfile');
        });
    });

    describe('updateProfile', () => {
        it('should save a profile in the database', async () => {
            profileRepository.updateProfileUser.mockResolvedValue('someProfile');
            expect(profileRepository.updateProfileUser).not.toHaveBeenCalled();

            const createprofileDto: UpdateProfileUserDto = {
                firstname: 'diego',
                lastname: 'libreros',
                email: 'postareservas@gmail.com',
                phone: null
            };

            const result = await profileService.updateProfileUser(1,createprofileDto);

            expect(profileRepository.updateProfileUser).toHaveBeenCalledWith(1,createprofileDto);
            expect(result).toEqual('someProfile');
        });
    });

    describe('getProfileByUserId', () => {
        it('should get profile by UserId', async () => {
            profileRepository.getProfileUserById.mockResolvedValue('someProducts');

            expect(profileRepository.getProfileUserById).not.toHaveBeenCalled();

            const result = await profileService.getProfileUserById(1);
            expect(profileRepository.getProfileUserById).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
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

});