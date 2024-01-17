import "next-auth";

declare module "next-auth" {
    interface User {
        role: string
        organizationId: string
        userId: string
    }
    interface JWT {
        role: string
    }
    interface Profile {
        email: string
        password: string
    }
}