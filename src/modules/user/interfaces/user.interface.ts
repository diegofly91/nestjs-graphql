export class IUser {
    readonly id: number;

    readonly username: string;

    readonly email: string;

    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status?: string;

    /**
     * readonly roleId: number;
     */

    readonly password: string;

    readonly createdAt?: Date;

    readonly updatedAt?: Date;
}
