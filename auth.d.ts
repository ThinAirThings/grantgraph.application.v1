import "next-auth";

declare module "next-auth" {
    interface User {
        role: string
    }
    interface JWT {
        role: string
    }
    interface Profile {
        email: string
        password: string
    }
}