import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

@InputType('CreateUserDto')
@ObjectType()
export class CreateUserDto {
    @Field()
    @MinLength(5, { message: 'El username es muy corto' })
    @MaxLength(25, { message: 'El username es muy largo' })
    @IsString()
    @IsOptional()
    readonly username: string;

    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    roleId: number;

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
