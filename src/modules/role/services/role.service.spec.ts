//import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '../services';
import { RoleRepository } from '../repositories';
import { Status } from '../../../shared/enums';

describe('RoleService', () => {
    let roleService;
    let roleRepository;

    const mockRoleRepository = () => ({
        getRoles: jest.fn(),
        createRole: jest.fn(),
        getRoleById: jest.fn(),
        deleteRole: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: RoleRepository,
                    useFactory: mockRoleRepository,
                },
            ],
        }).compile();

        roleService = await module.get<RoleService>(RoleService);
        roleRepository = await module.get<RoleRepository>(RoleRepository);
    });

    describe('createRole', () => {
        it('should save a Role in the database', async () => {
            roleRepository.createRole.mockResolvedValue('someRole');
            expect(roleRepository.createRole).not.toHaveBeenCalled();

            const createRoleDto = {
                name: 'CUSTOMER',
                description: 'nuevo role',
            };

            const result = await roleService.createRole(createRoleDto);

            expect(roleRepository.createRole).toHaveBeenCalledWith(createRoleDto);
            expect(result).toEqual('someRole');
        });
    });

    describe('getRoles', () => {
        it('should get all Roles', async () => {
            roleRepository.getRoles.mockResolvedValue('someProducts');

            expect(roleRepository.getRoles).not.toHaveBeenCalled();

            const result = await roleService.getRoles();
            expect(roleRepository.getRoles).toHaveBeenCalled();
            expect(result).toEqual('someProducts');
        });
    });

    describe('getRoleById', () => {
        it('should retrieve a Role with an ID', async () => {
            const mockRole = {
                Rolename: 'diegofly91',
                password: 'diegofl91',
                status: Status.PREACTIVE,
            };

            roleRepository.getRoleById.mockResolvedValue(mockRole);

            const result = await roleService.getRoleById(1);
            expect(result).toEqual(mockRole);

            expect(roleRepository.getRoleById).toHaveBeenCalledWith(1);
        });

        /*    it('throws an error Role is not exists', () => {
               RoleRepository.getRoleById.mockResolvedValue(NotFoundException);       
                expect(RoleService.getRoleById(1)).rejects.toThrowError(NotFoundException);
        });*/
    });

    describe('deleteRole', () => {
        it('should delete Role', async () => {
            roleRepository.deleteRole.mockResolvedValue(1);
            expect(roleRepository.deleteRole).not.toHaveBeenCalled();
            await roleService.deleteRole(1);
            expect(roleRepository.deleteRole).toHaveBeenCalledWith(1);
        });
    });
});
