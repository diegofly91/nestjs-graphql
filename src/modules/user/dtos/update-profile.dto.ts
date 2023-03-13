import { CreateProfileUserDto } from './create-profile.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProfileUserDto extends PartialType(CreateProfileUserDto) {}
