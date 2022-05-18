import { Module } from '@nestjs/common';
import { UserSeederService, ProfileSeederService } from './';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Profile } from '@/modules/user/entities';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    providers: [UserSeederService, ProfileSeederService],
    exports: [UserSeederService, ProfileSeederService],
})
export class UserSeederModule {}
