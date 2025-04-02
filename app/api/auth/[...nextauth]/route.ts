import NextAuth from "next-auth"
import { authConfig } from "@/auth"
import { User, Session } from "next-auth"


// Расширяем тип User, чтобы включить roles
interface ExtendedUser extends User {
    roles?: string[];
}

// Расширяем тип Session, чтобы включить roles
interface ExtendedSession extends Session {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        roles?: string[]; // Add roles property
    }
}


const handler = NextAuth({
    ...authConfig,
    session: {
        strategy:"jwt"
    },
    callbacks: {
        async signIn({ user, account }) : Promise<boolean> {
            if (account?.email === "admin@example.com") {
                // Если аккаунт является администратором, добавляем роль admin
                (user as ExtendedUser).roles = ["admin"];
            }

            return true; // Возвращаем true для успешного входа
        },
        async session({ session, token }) : Promise<ExtendedSession> {
            // Добавляем roles в объект session
            if (token.roles) {}
            return session as ExtendedSession;
        },
        async jwt({ token, user }) {
            // Добавляем roles в JWT
            if (user) {
                const extendedUser = user as ExtendedUser;
                token.roles = extendedUser.roles;
            }
            return token;
        }
    },
})

export { handler as GET, handler as POST }
