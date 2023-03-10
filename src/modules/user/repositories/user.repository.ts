import { BadRequestException, NotFoundException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { User } from '../entities';
import { Status } from '@/modules/shared/enums';
import { UserInterfaceRepository } from '../interfaces';

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
        if (!user) throw new NotFoundException('User is not exists');
        return user;
    }

    async getPasswordByUsename(username: string): Promise<string> {
        const pass = await this.usersRepository
            .createQueryBuilder()
            .select('password')
            .where('username = :username', { username })
            .getRawOne();
        return pass.password;
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
        const { username } = dto;
        const exitsUsername = await this.getUserByUsername(username);
        if (exitsUsername) {
            throw new HttpException('the Exits USERNAME', HttpStatus.PRECONDITION_FAILED);
        }
        const { raw } = await this.usersRepository.createQueryBuilder().insert().into(User).values(dto).execute();
        return raw;
    }

    async deleteUser(userId: number): Promise<User> {
        const user: User = await this.getUserById(userId);
        const userDeleted = await this.usersRepository.save(user);
        return userDeleted;
    }

    async createUsername(email: string): Promise<string> {
        //const r = Math.random().toString(36).substring(4);
        const usermail = email.split('@');
        let username = usermail[0];
        username =
            username.length < 4
                ? username +
                  Math.random()
                      .toString(36)
                      .substring(8 - username.length)
                : username + Math.random().toString(36).substring(4);
        username = username.length > 24 ? username.substr(20) : username;
        return username;
    }

    async newPasswordRequest(): Promise<string> {
        return Math.random().toString(36).substr(2, 8);
    }
}
