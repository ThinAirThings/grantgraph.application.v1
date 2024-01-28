

export type GrantGraphUser = {
    userId: string,
    userEmail: string,
    userName: string,
    userRole: string,
    organizationId: string,
    lastSignIn: string,
    savedGrantIds: string[],
    cvIndexState?: 'indexing' | 'ready',
}