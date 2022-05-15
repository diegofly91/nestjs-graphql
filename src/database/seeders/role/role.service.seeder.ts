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

    createRoles(): Array<Promise<Role>> {
        return rolesSeed.map(async (role: IRole) => {
            const roleN = await this.roleRepository.findOne({ name: role.name });
            if (!roleN) return await this.roleRepository.save(role);
            else return roleN;
        });
    }
}
