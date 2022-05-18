import { IsInt, IsOptional } from 'class-validator';

export class PaginationArgs {
    @IsOptional()
    @IsInt()
    offset: number = 0;

    @IsOptional()
    @IsInt()
    limit: number = 10;
}
