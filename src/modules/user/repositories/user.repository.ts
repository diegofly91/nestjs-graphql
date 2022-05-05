import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findAll(): Promise<User[]> {
        return await this.find();
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('User is not exists');
        return user;
    }

    async findOneByUsername(username: string): Promise<User> {
        if (!username) throw new BadRequestException('username must be provided');
        const user = await this.createQueryBuilder('user').where('user.username = :username', { username }).getOne();
        if (!user) throw new NotFoundException('User is not exists');
        return user;
    }

    async getUserByCompanyId(companyId: number): Promise<User> {
        return await this.createQueryBuilder('user')
            .innerJoinAndSelect('companies', 'companies', 'companies.user_id = user.id AND companies.id = :companyId', {
                companyId,
            })
            .getOne();
    }

    /*
    async findOneByEmailFace(email: string): Promise<User> {
        const user = await this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();

        return user;
    }

    async findByEmail(dto: QueryUserEmailDto): Promise<boolean> {
        const existUser = await this.findOne({ email: dto.email });
        return !!existUser;
    }

    async findOneByEmail(email: string): Promise<User> {
        if (!email) throw new BadRequestException('An email must be provided');

        const user = await this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .addSelect('user.password')
            .getOne();

        if (!user) throw new NotFoundException('User is not exists');

        return user;
    }*/

    async createUser(dto: CreateUserDto): Promise<User> {
        //const user = await this.userExist(dto);
        // if (!dto.username) {
        //     dto.username = await this.createUsername(dto.email);
        // }
        //if (user) throw new BadRequestException('User is already registered');
        const newUser: User = await this.create(dto);
        await this.save(newUser);
        delete (await newUser[0]).password;
        return newUser[0];
    }

    async deleteUser(userId: number): Promise<User> {
        const user = await this.findOneById(userId);
        const userDeleted = await this.remove(user);
        delete (await userDeleted).password;
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
        return await Math.random().toString(36).substr(2, 8);
    }

    /*
    async userExist(dto: FindByEmailDto): Promise<boolean> {
        const user = await this.createQueryBuilder('user')
            .select('user.email')
            .where('user.email = :email', { email: dto.email })
            .getOne();

        return !!user;
    }*/
}
