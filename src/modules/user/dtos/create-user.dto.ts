import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@ObjectType()
export class CreateUserDto {
    @Field()
    @MinLength(5, { message: 'El username es muy corto' })
    @MaxLength(25, { message: 'El username es muy largo' })
    @IsString()
    @IsOptional()
    readonly username: string;

    @Field()
    @MinLength(5, { message: 'El email es muy corto' })
    @MaxLength(60, { message: 'El email es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @Field()
    @MinLength(8, { message: 'La contraseña es muy corta' })
    @MaxLength(60, { message: 'La contraseña es muy larga' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @Field()
    @IsString()
    @IsOptional()
    readonly status?: string;
}
