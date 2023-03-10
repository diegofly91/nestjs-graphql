import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/modules/role/entities';
import { IRole } from '@/modules/role/interfaces';
import { rolesSeed } from './data/role.seed';

@Injectable()
export class RoleSeederService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async createRoles(): Promise<Role[]> {
        const { raw } = await this.roleRepository.createQueryBuilder().insert().into(Role).values(rolesSeed).execute();
        return raw;
    }
}
