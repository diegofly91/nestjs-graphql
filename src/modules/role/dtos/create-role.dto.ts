import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateRoleInput')
export class CreateRoleDto {
    @Field()
    @MinLength(4, { message: 'El nombre es muy corto' })
    @MaxLength(60, { message: 'El nombre es muy largo' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @MaxLength(240, { message: 'La descripcion es muy larga' })
    @IsString()
    description: string;
}
