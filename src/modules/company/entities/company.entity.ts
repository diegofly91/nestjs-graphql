import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserCompany } from '../../user/entities/';
import { ICompany } from '../interfaces';
import { Deleted, IsActive } from '../../shared/enums';

@Entity({ name: 'companies' })
export class Company implements ICompany {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', nullable: true, length: 150 })
    description: string;

    @Column({ type: 'varchar', length: 100 })
    address: string;

    @Column({ type: 'varchar', nullable: true, length: 240 })
    logo: string;

    @Column({
        type: 'int',
        nullable: true,
        name: 'is_active',
        default: 1,
        transformer: {
            to: (value: number) => (value === IsActive.TRUE ? true : false),
            from: (value: boolean) => (value ? IsActive.TRUE : IsActive.FALSE),
        },
    })
    isActive: boolean;

    @Column({
        type: 'int',
        name: 'deleted',
        nullable: true,
        default: 0,
        transformer: {
            from: (value: number) => (value == Deleted.TRUE ? true : false),
            to: (value: boolean) => (value ? Deleted.TRUE : Deleted.FALSE),
        },
    })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @OneToMany(() => UserCompany, (userCompany) => userCompany.company, { cascade: true })
    userCompanys: UserCompany[];
}
