import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('Token')
export class Token {
    @Field()
    @IsString()
    @IsNotEmpty()
    access_token: string;
}
