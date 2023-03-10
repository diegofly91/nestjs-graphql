import { CreateRoleDto } from './create-role.dto';
import { PartialType } from '@nestjs/graphql';

export class FindByNameRoleDto extends PartialType(CreateRoleDto) {}
