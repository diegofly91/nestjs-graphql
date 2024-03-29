import { Module, forwardRef, Logger } from '@nestjs/common';
import { SeederService } from './service';
import { UserModule } from '../user';
import { RoleModule } from '../role';

@Module({
    imports: [forwardRef(() => UserModule), forwardRef(() => RoleModule)],
    providers: [SeederService, Logger],
    exports: [SeederService],
})
export class SeederModule {}
