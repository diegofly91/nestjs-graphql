import { UserCompany } from '../entities';
import { UserCompanyInterfaceRepository } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCompanyRepository<UserCompany> implements UserCompanyInterfaceRepository<UserCompany> {
    constructor(
        @InjectRepository(UserCompany)
        private readonly userCompanyRepository: Repository<UserCompany>,
    ) {}
    async getUserCompanyByUserId(userId: number): Promise<UserCompany> {
        return await this.userCompanyRepository
            .createQueryBuilder('userCompany')
            .where('userCompany.user_id = :userId', { userId })
            .getOne();
    }

    async createUserCompany(userId: number, companyId: number): Promise<boolean> {
        const userCompany = await this.userCompanyRepository
            .createQueryBuilder()
            .insert()
            .into(UserCompany)
            .values({ userId, companyId })
            .execute();
        return !!userCompany;
    }
}
