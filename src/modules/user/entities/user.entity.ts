import * as bcrypt from 'bcryptjs';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../../shared/enums';
import { Role } from '../../role/entities';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: true, length: 25, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 60, select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) return;
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ type: 'int', name: 'role_id', nullable: false })
    roleId: number;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({ type: 'varchar', default: Status.PREACTIVE, nullable: true, length: 9 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
