export class IUserPayload {
    readonly id: number;

    readonly username: string;

    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status?: string;

    readonly roleId: number;

    readonly roleName: string;

    readonly companyId?: number;
}
