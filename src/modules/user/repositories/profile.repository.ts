import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileInterfaceRepository } from '../interfaces';

@Injectable()
export class ProfileRepository<Profile> implements ProfileInterfaceRepository<Profile> {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {}

    async getProfileUserById(userId: number): Promise<Profile> {
        return await this.profileRepository
            .createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
    }

    async getProfileByEmail(email: string): Promise<Profile> {
        const existsProfile = await this.profileRepository
            .createQueryBuilder('profiles')
            .select()
            .where('profiles.email = :email', { email })
            .getOne();

        return existsProfile;
    }

    async createProfileUser(userId: number, dto: CreateProfileUserDto): Promise<Profile> {
        const existsProfile = await this.getProfileByEmail(dto.email);
        if (!!existsProfile) {
            throw new BadRequestException(`The user already registered.`);
        }
        //const createProfile = Object.assign({}, userId, dto);
        const newProfile = new Profile();
        newProfile.email = dto.email;
        newProfile.firstname = dto.firstname;
        newProfile.lastname = dto.lastname;
        newProfile.phone = dto.phone;
        newProfile.userId = userId;
        const { raw } = await this.profileRepository
            .createQueryBuilder()
            .insert()
            .into(Profile)
            .values(newProfile)
            .execute();
        return raw;
    }

    async updateProfileUser(userId: number, dto: UpdateProfileUserDto): Promise<Profile> {
        const profile = await this.profileRepository
            .createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
        if (!profile) throw new BadRequestException(`The user already  not profile.`);
        const profileToUpdate = Object.assign(profile, dto);
        const profileUpdated = await this.profileRepository.save(profileToUpdate);
        return profileUpdated;
    }
}
