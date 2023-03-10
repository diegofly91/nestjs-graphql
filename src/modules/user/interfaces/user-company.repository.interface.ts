import { UserCompany } from '../entities';

export interface UserCompanyInterfaceRepository<UserCompany> {
    getUserCompanyByUserId(userId: number): Promise<UserCompany>;
    createUserCompany(userId: number, companyId: number): Promise<boolean>;
}
