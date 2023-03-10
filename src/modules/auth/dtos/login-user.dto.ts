import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('LoginUserDto')
export class LoginUserDto {
    @Field()
    @MinLength(5, { message: 'El usename es muy corto' })
    @MaxLength(60, { message: 'El username es muy largo' })
    @IsNotEmpty()
    username: string;

    @Field()
    @MinLength(8, { message: 'La contraseña es muy corta' })
    @MaxLength(240, { message: 'La contraseña es muy larga' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
