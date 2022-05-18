import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Company } from '../../company/entities';
import { User } from './';

@Entity('users_companies')
export class UserCompany {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'user_id' })
    userId: number;
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'company_id' })
    companyId: number;
    @ManyToOne(() => Company, (company) => company.userCompanys)
    @JoinColumn({ name: 'company_id' })
    company: Company;
}
