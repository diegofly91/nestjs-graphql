import { Status } from '@/modules/shared/enums';
import { CreateUserDto, CreateProfileUserDto } from '@/modules/user/dtos';

export const usersSeed: { userDto: CreateUserDto; profileDto: CreateProfileUserDto }[] = [
    {
        userDto: {
            username: 'Diegofly',
            roleId: 1,
            password: 'DiegoPassword',
            status: Status.ACTIVE,
        },
        profileDto: {
            lastname: 'Libreros',
            firstname: 'Diego',
            email: 'diegolibreros@gmail.com',
        },
    },
];
