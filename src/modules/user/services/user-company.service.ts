import { Injectable } from '@nestjs/common';
import { UserCompany } from '../entities';
import { UserCompanyRepository } from '../repositories';

@Injectable()
export class UserCompanyService {
    constructor(private userCompanyRepository: UserCompanyRepository) {}

    async getUserCompanyByUserId(userId: number): Promise<UserCompany> {
        return await this.userCompanyRepository.getUserCompanyByUserId(userId);
    }

    async createUserCompany(userId: number, companyId: number): Promise<boolean> {
        return await this.userCompanyRepository.createUserCompany(userId, companyId);
    }
}
