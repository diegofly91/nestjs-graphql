import { IsNotEmpty, IsOptional, IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateCompanyDto')
export class CreateCompanyDto {
    @Field()
    @MinLength(5, { message: 'El nombre es muy corto' })
    @MaxLength(50, { message: 'El nombre es muy largo' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @MaxLength(150, { message: 'La descripcion es muy larga' })
    @IsOptional()
    description: string;

    @Field()
    @MaxLength(100, { message: 'La direccion es muy larga' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @Field()
    @MaxLength(240, { message: 'La descripcion es muy larga' })
    @IsOptional()
    logo?: string;

    @Field()
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
