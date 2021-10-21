import { Set } from "typescript"

export interface Role {
    tenantId: string,
    appId: string,
    roleId: string,
    roleName: string,
    permissions: Set<string>,
    managedBy: string,
    canGrantToUsers: boolean,
    canGrantToApps: boolean,
    isActive: boolean,
}