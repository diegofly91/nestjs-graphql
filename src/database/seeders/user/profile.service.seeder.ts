import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '@/modules/user/entities';
import { profilesSeed } from './data/user.seed';
import { IProfile } from '@/modules/user/interfaces';

@Injectable()
export class ProfileSeederService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {}

    async createProfiles(): Promise<Profile[]> {
        const { raw } = await this.profileRepository
            .createQueryBuilder()
            .insert()
            .into(Profile)
            .values(profilesSeed)
            .execute();
        return raw;
    }
}
