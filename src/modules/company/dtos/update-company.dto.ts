import { CreateCompanyDto } from './create-company.dto';
import { PartialType } from '@nestjs/graphql';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
