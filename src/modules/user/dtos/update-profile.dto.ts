import { PartialType } from '@nestjs/graphql';
import { CreateProfileUserDto } from './create-profile.dto';

export class UpdateProfileUserDto extends PartialType(CreateProfileUserDto) {}
