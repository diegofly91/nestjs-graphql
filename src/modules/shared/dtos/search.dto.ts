import { IsString, Min, Max, IsInt, IsOptional } from 'class-validator';
import { Status } from '../enums';

export class SearchDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsInt()
    @Min(0)
    @Max(1)
    @IsOptional()
    isActive = 1;

    @IsInt()
    @Min(0)
    @Max(1)
    @IsOptional()
    deleted = 0;

    @IsOptional()
    status: string = Status.ACTIVE;
}
