import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserCompany } from '../../user/entities/';

@Entity({ name: 'companies' })
export class Company {
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
            to: (value: number) => (value == 1 ? true : false),
            from: (value: boolean) => (value ? 1 : 0),
        },
    })
    isActive: boolean;

    @Column({
        type: 'int',
        name: 'deleted',
        nullable: true,
        default: 0,
        transformer: {
            from: (value: number) => (value == 1 ? true : false),
            to: (value: boolean) => (value ? 1 : 0),
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
