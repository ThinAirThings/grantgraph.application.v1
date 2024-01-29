import { GrantGraphUser } from "./GrantGraphUser"


export type GrantGraphOrganization = {
    organizationId: string
    organizationName: string
    users: Record<string, GrantGraphUser>
}