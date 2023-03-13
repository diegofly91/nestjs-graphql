import { IsNotEmpty, IsOptional, IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';

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

    @MaxLength(240, { message: 'La descripcion es muy larga' })
    @IsOptional()
    logo?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
