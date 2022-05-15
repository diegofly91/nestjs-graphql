import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/entities';
import { IUser } from '@/modules/user/interfaces';
import { usersSeed } from './data/user.seed';

@Injectable()
export class UserSeederService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    createUsers(): Array<Promise<User>> {
        return usersSeed.map(async (user: IUser) => {
            const userN = await this.userRepository.findOne({ id: user.id });

            if (!userN) {
                const newUser = this.userRepository.create(user);
                const userSaved = await this.userRepository.save(newUser);
                delete (await userSaved).password;
                return userSaved;
            } else return userN;
        });
    }
}
