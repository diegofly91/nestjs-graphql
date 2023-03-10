import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './repositories';
import { CompanyResolver } from './resolvers';
import { CompanyService } from './services';
import { AuthModule } from '../auth';
import { Company } from './entities';

@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Company])],
    providers: [
        CompanyService,
        CompanyResolver,
        {
            provide: 'CompanyRepositoryInterface',
            useClass: CompanyRepository,
        },
    ],
    exports: [CompanyService],
})
export class CompanyModule {}
