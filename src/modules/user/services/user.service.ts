import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll();

        return users.map((user: User) => {
            return user;
        });
    }

    async getUserById(userId: number): Promise<User> {
        return await this.userRepository.findOneById(userId);
    }

    async getUserByCompanyId(companyId: number): Promise<User> {
        return await this.userRepository.getUserByCompanyId(companyId);
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(dto);
    }

    async deleteUser(userId: number): Promise<User> {
        return await this.userRepository.deleteUser(userId);
    }
}
