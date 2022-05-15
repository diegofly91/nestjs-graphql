import { RoleType } from '../enums';

export interface IRole {
    /**
     * ID autoincrement from database.
     */
    readonly id?: number;

    /**
     * Name of Role
     */
    readonly name?: RoleType;

    /**
     * Description of Role
     */
    readonly description?: string;
}
