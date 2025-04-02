// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
  interface User extends DefaultUser {
    roles?: string[]; // Add roles property
  }

  interface Session extends DefaultSession {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles?: string[]; // Add roles property
    };
  }

  interface JWT {
    roles?: string[]; // Add roles property to JWT
  }
}