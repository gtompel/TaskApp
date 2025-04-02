import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your user authentication logic
        const user = {
          id: "1", // Ensure ID is a string
          name: "John Doe",
          email: credentials?.email,
          roles: credentials?.email === "admin@example.com" ? ["admin"] : ["user"], // Assign roles
        };

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add roles to the JWT token
      if (user) {
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      // Add roles to the session object
      if (token.roles) {
        session.user.roles = token.roles;
      }
      return session;
    },
  },
};