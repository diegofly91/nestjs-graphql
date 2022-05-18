import {
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsOptional,
    ValidationArguments,
} from 'class-validator';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export class CreateProfileUserDto {
    @MinLength(5, { message: 'Title is too short' })
    @MaxLength(60, { message: 'Title is too long' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    firstname: string;

    @MaxLength(60, { message: 'Description is too long' })
    @IsOptional()
    lastname: string;

    @MinLength(5, { message: 'El email es muy corto' })
    @MaxLength(60, { message: 'El email es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString({ message: 'must be a valid number' })
    @IsPhoneNumber('CO', {
        message: (args: ValidationArguments) => {
            if (args.value.length !== 12) {
                throw new BadRequestException(`${args.value} Invalid MobilePhone Number`);
            } else {
                throw new InternalServerErrorException();
            }
        },
    })
    @IsOptional()
    phone: string;
}
