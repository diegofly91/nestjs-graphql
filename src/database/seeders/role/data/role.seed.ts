import { IRole } from '@/modules/role/interfaces';
import { RoleType } from '@/modules/role/enums';

export const rolesSeed: IRole[] = [
    {
        id: 1,
        name: RoleType.SUPERUSER,
        description: 'Este Rol puede operar toda la aplicacion con total libertad.',
    },
    {
        id: 2,
        name: RoleType.ADMIN,
        description: 'Este Rol puede ejecutar todas las funciones que corresponden a un administrador.',
    },
    {
        id: 3,
        name: RoleType.ADVISER,
        description: 'puede ejecutar todas las funciones que corresponden a un Negocio/Compañia.',
    },
];
