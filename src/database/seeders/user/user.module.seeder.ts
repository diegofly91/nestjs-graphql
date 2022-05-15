import { Module } from '@nestjs/common';
import { UserSeederService } from './user.service.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserSeederService],
    exports: [UserSeederService],
})
export class UserSeederModule {}
