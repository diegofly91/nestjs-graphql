//import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '../services';
import { RoleType } from '../enums/index';
import { CreateRoleDto } from '../dtos';
import { IRole } from '../interfaces';

const Roles: IRole[] = [
    { 
        id: 1,
        name: RoleType.SUPERUSER,
        description: '' 
    },
    {
        id: 2,
        name: RoleType.ADMIN,
        description: '',
    },
];
describe('RoleService', () => {
    let roleService;

    const mockRoleRepository = () => ({
        getRoles: jest.fn().mockImplementation(() => {
            return Promise.resolve(Roles);
        }),
        createRole: jest.fn().mockImplementation((dto: CreateRoleDto) => {
            return Promise.resolve({
                id: Date.now(),
                ...dto,
            });
        }),
        getRoleById: jest.fn().mockImplementation((id: number) => {
            const role = Roles.find((item) => item.id === id)
            return Promise.resolve(role);
        }),
        deleteRole: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: 'RoleRepositoryInterface',
                    useFactory: mockRoleRepository,
                },
            ],
        }).compile();

        roleService = await module.get<RoleService>(RoleService);
    });

    describe('getRoles', () => {
        it('should get all Roles', async () => {
            const result = await roleService.getRoles();
            expect(result).toEqual(Roles);
            expect(result.length).toBe(Roles.length)
        });
    });
    describe('createRole', () => {
        it('should save a Role in the database', async () => {
            const createRoleDto = {
                name: 'CUSTOMER',
                description: 'nuevo role',
            };

            const result = await roleService.createRole(createRoleDto);

            expect(result).toEqual({
                id: expect.any(Number),
                ...createRoleDto,
            });
        });
    });
    describe('getRoleById', () => {
        it('should retrieve a Role with an ID', async () => {
            const id = 1;
            const result = await roleService.getRoleById(id);
            expect(result).toEqual({
                id,
                name: expect.any(String),
                description: expect.any(String),
            });
        });
    });
    /*

    describe('deleteRole', () => {
        it('should delete Role', async () => {
            roleRepository.deleteRole.mockResolvedValue(1);
            expect(roleRepository.deleteRole).not.toHaveBeenCalled();
            await roleService.deleteRole(1);
            expect(roleRepository.deleteRole).toHaveBeenCalledWith(1);
        });
    });
    */
});
