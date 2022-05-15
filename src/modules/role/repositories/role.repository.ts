import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Status } from '../../../shared/enums';
import { CreateRoleDto, FindByNameRoleDto, UpdateRoleDto } from '../dtos';
import { Role } from '../entities';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    async getRoles(): Promise<Role[]> {
        return await this.find();
    }

    async getRoleById(roleId: number): Promise<Role> {
        if (!roleId) throw new BadRequestException('The role ID is required');
        const role = await this.findOne(roleId);
        if (!role) throw new NotFoundException('The role is not exists');
        return role;
    }

    async findOneByName(dto: FindByNameRoleDto): Promise<Role> {
        const role = await this.findOne({
            where: {
                status: Status.ACTIVE,
                name: dto.name,
            },
        });
        if (!role) throw new NotFoundException('The role is not exists');
        return role;
    }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = await this.roleExist(dto);
        if (role) throw new BadRequestException('The role is already registered');
        const newRole = this.create(dto);
        const roleSaved = await this.save(newRole);
        return roleSaved;
    }

    async updateRole(roleId: number, dto: UpdateRoleDto): Promise<Role> {
        if (!roleId) throw new BadRequestException('The role ID is required');
        const role = await this.getRoleById(roleId);
        const roleToUpdate = Object.assign(role, dto);
        const roleUpdated = await this.save(roleToUpdate);
        return roleUpdated;
    }

    async deleteRole(roleId: number): Promise<Role> {
        if (!roleId) throw new BadRequestException('The role ID is required');
        const role = await this.getRoleById(roleId);
        const roleDeleted = await this.remove(role);
        return roleDeleted;
    }

    private async roleExist(dto: FindByNameRoleDto): Promise<boolean> {
        const role = await this.createQueryBuilder('role').where('role.name = :name', { name: dto.name }).getOne();

        return !!role;
    }
}
