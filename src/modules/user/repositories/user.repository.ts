import { BadRequestException, NotFoundException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { User } from '../entities';
import { IUser, UserInterfaceRepository } from '../interfaces';

@Injectable()
export class UserRepository<User> implements UserInterfaceRepository<User> {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        return await this.usersRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
    }

    async getUserByUsername(username: string): Promise<User> {
        if (!username) throw new BadRequestException('username must be provided');
        const user: User = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .getOne();
        return user;
    }

    async getPasswordByUsename(username: string): Promise<User> {
        return await this.usersRepository
            .createQueryBuilder('user')
            .select()
            .addSelect('user.password')
            .where('user.username = :username', { username })
            .getOne();
    }

    async getUserByCompanyId(companyId: number): Promise<User> {
        return await this.usersRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('companies', 'companies', 'companies.user_id = user.id AND companies.id = :companyId', {
                companyId,
            })
            .getOne();
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const exitsUsername = await this.getUserByUsername(dto.username);
        if (exitsUsername) {
            throw new HttpException('The Exits USERNAME', HttpStatus.PRECONDITION_FAILED);
        }
        const user = new User();
        user.password = dto.password;
        user.roleId = dto.roleId;
        user.status = dto.status;
        user.username = dto.username;
        //return await this.usersRepository.save(this.usersRepository.create(user));

        const { raw } = await this.usersRepository.createQueryBuilder().insert().into(User).values(user).execute();
        return raw[0];
    }

    async deleteUser(userId: number): Promise<User> {
        const user: User = await this.getUserById(userId);
        const userDeleted = await this.usersRepository.save(user);
        return userDeleted;
    }

    async newPasswordRequest(): Promise<string> {
        return Math.random().toString(36).substr(2, 8);
    }
}
