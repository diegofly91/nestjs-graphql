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

    createProfiles(): Array<Promise<Profile>> {
        return profilesSeed.map(async (profile: IProfile) => {
            const profileN = await this.profileRepository.findOne({ userId: profile.userId });
            if (!profileN) {
                const newProfile = this.profileRepository.create(profile);
                const userSaved = await this.profileRepository.save(newProfile);
                return userSaved;
            } else return profileN;
        });
    }
}
