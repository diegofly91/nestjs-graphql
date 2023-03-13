import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class FindByEmailDto {
    @MinLength(5, { message: 'El correo electronico es muy corto' })
    @MaxLength(60, { message: 'El correo electronico es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
