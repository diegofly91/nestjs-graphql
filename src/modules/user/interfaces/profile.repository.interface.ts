import { Profile } from '../entities';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';

export interface ProfileInterfaceRepository<Profile> {
    getProfileUserById(userId: number): Promise<Profile>;
    getProfileByEmail(email: string): Promise<Profile>;
    createProfileUser(userId: number, dto: CreateProfileUserDto): Promise<Profile>;
    updateProfileUser(userId: number, dto: UpdateProfileUserDto): Promise<Profile>;
}
