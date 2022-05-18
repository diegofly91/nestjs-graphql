import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile } from '../entities';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    async getProfileUserById(userId: number): Promise<Profile> {
        return await this.createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
    }

    async getProfileByEmail(email: string): Promise<Profile> {
        const existsProfile = await this.createQueryBuilder('profiles')
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
        const createProfile = Object.assign(userId, dto);
        const newProfile = await this.create(createProfile);
        return await this.save(newProfile);
    }

    async updateProfileUser(userId: number, dto: UpdateProfileUserDto): Promise<Profile> {
        const profile = await this.createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
        if (!profile) throw new BadRequestException(`The user already  not profile.`);
        const profileToUpdate = Object.assign(profile, dto);
        const profileUpdated = await this.save(profileToUpdate);
        return profileUpdated;
    }
}
