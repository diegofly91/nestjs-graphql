import { IUser } from '@/modules/user/interfaces';
import { Status } from '@/shared/enums';

export const usersSeed: IUser[] = [
    {
        id: 1,
        username: 'PostaReservas',
        roleId: 1,
        password: 'Julian191004',
        status: Status.ACTIVE,
    },
];
