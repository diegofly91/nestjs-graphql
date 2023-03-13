import { IsArray, IsOptional } from 'class-validator';
import { JokerByIdDto } from '.';

export class WithAssocOptions {
    @IsOptional()
    @IsArray()
    creates?: JokerByIdDto[];

    @IsOptional()
    @IsArray()
    deletes?: JokerByIdDto[];
}
