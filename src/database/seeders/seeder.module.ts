import { Logger, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RoleSeederModule } from './role/role.module.seeder';
import { UserSeederModule } from './user/user.module.seeder';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule, RoleSeederModule, UserSeederModule],
    providers: [SeederService, Logger],
})
export class SeederModule {}
