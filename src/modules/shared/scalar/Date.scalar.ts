import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<Date, Date> {
    parseValue(value: number): Date {
        return new Date(value);
    }

    serialize(value: Date): Date {
        return value; // value sent to the client
    }

    parseLiteral(ast: ValueNode): Date {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    }
}
