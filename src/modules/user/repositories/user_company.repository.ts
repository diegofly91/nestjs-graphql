import { EntityRepository, Repository } from 'typeorm';
import { UserCompany } from '../entities';

@EntityRepository(UserCompany)
export class UserCompanyRepository extends Repository<UserCompany> {
    async getUserCompanyByUserId(userId: number): Promise<UserCompany> {
        return await this.createQueryBuilder('userCompany').where('userCompany.user_id = :userId', { userId }).getOne();
    }

    async createUserCompany(userId: number, companyId: number): Promise<boolean> {
        const userCompany = await this.createQueryBuilder()
            .insert()
            .into(UserCompany)
            .values({ userId, companyId })
            .execute();
        return !!userCompany;
    }
}
