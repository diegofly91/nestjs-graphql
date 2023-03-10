import { User } from '../entities';
import { CreateUserDto } from '../dtos';

export interface UserInterfaceRepository<User> {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    getPasswordByUsename(username: string): Promise<string>;
    getUserByCompanyId(companyId: number): Promise<User>;
    createUser(dto: CreateUserDto): Promise<User>;
    deleteUser(userId: number): Promise<User>;
    createUsername(email: string): Promise<string>;
    newPasswordRequest(): Promise<string>;
}
