import { IsEmail, IsNotEmpty } from 'class-validator';

export class QueryUserEmailDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
