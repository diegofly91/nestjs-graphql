import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileUserDto } from './create-profile.dto';

export class UpdateProfileUserDto extends PartialType(CreateProfileUserDto) {}
