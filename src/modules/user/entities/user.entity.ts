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
import { InternalServerErrorException } from '@nestjs/common';
import { Status } from '../../shared/enums';
import { Role } from '../../role/entities';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: true, length: 25, unique: true })
    username: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!!this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    @Column({ type: 'varchar', length: 100, select: false })
    password: string;

    @Column({ type: 'int', name: 'role_id', nullable: false })
    roleId: number;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({ type: 'varchar', default: Status.ACTIVE, nullable: true, length: 9 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
