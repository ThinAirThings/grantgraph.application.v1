

export type GrantGraphOrganization = {
    organizationId: string
    organizationName: string
    users: Record<string, GrantGraphUser>
}