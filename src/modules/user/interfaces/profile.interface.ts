export class IProfile {
    readonly id?: number;

    readonly userId: number;

    readonly firstname: string;

    readonly lastname: string;

    readonly email: string;

    readonly createdAt?: Date;

    readonly updatedAt?: Date;
}
