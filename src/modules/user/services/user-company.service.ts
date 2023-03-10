import { Injectable, Inject } from '@nestjs/common';
import { UserCompany } from '../entities';
import { UserCompanyRepository } from '../repositories';

@Injectable()
export class UserCompanyService {
    constructor(
        @Inject('UserCompanyRepositoryInterface')
        private readonly userCompanyRepository: UserCompanyRepository<UserCompany>,
    ) {}

    async getUserCompanyByUserId(userId: number): Promise<UserCompany> {
        return await this.userCompanyRepository.getUserCompanyByUserId(userId);
    }

    async createUserCompany(userId: number, companyId: number): Promise<boolean> {
        return await this.userCompanyRepository.createUserCompany(userId, companyId);
    }
}
