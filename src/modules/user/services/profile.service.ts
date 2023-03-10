import { Injectable, Inject } from '@nestjs/common';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { ProfileRepository } from '../repositories';

@Injectable()
export class ProfileService {
    constructor(
        @Inject('ProfileRepositoryInterface')
        private readonly profileUserRepository: ProfileRepository<Profile>,
    ) {}

    async getProfileUserById(userId: number): Promise<Profile> {
        return await this.profileUserRepository.getProfileUserById(userId);
    }

    async getProfileByEmail(email: string): Promise<Profile> {
        return await this.profileUserRepository.getProfileByEmail(email);
    }

    async createProfileUser(id: number, dto: CreateProfileUserDto): Promise<Profile> {
        return this.profileUserRepository.createProfileUser(id, dto);
    }

    async updateProfileUser(id: number, dto: UpdateProfileUserDto): Promise<Profile> {
        return await this.profileUserRepository.updateProfileUser(id, dto);
    }
}
