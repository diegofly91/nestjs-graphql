export interface ICompany {
    /**
     * ID autoincrement from database.
     */
    readonly id: number;

    /**
     * Name of Company
     */
    readonly name: string;

    /**
     * Description of Company
     */
    readonly description?: string;

    readonly address?: string;

    readonly logo?: string;

    readonly isActive: boolean;

    readonly deleted: boolean;

    readonly createdAt?: Date;

    readonly updatedAt?: Date;
}
