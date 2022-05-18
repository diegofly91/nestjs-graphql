//import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Expose, Exclude } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    //  IsPhoneNumber,
    IsString,
    IsBoolean,
    MaxLength,
    //  ValidationArguments,
    MinLength,
} from 'class-validator';

export class CreateCompanyDto {
    @MinLength(5, { message: 'El nombre es muy corto' })
    @MaxLength(50, { message: 'El nombre es muy largo' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @MaxLength(150, { message: 'La descripcion es muy larga' })
    @IsOptional()
    description: string;

    @MaxLength(100, { message: 'La direccion es muy larga' })
    @IsString()
    @IsNotEmpty()
    address: string;

    /* @IsString({ message: 'Debe ser un numero valido' })
    @IsPhoneNumber('CO', {
        message: (args: ValidationArguments) => {
            if (args.value.length !== 12) {
                throw new BadRequestException(`${args.value} Invalid MobilePhone Number`);
            } else {
                throw new InternalServerErrorException();
            }
        },
    })
    phone: string;*/

    @MaxLength(240, { message: 'La descripcion es muy larga' })
    @IsOptional()
    logo?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
