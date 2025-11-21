import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      isApproved: boolean
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    isApproved: boolean
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string
    isApproved: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    isApproved: boolean
  }
}
