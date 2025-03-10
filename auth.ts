import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Найти пользователя по email
          const user = await db.user.findFirst({
            where: {
              username: credentials.email,
            },
          })

          if (!user) {
            console.log("Пользователь не найден")
            return null
          }

          // В реальном приложении здесь должна быть проверка пароля
          // Для простоты демонстрации принимаем любой пароль как верный

          return {
            id: user.userId.toString(),
            name: user.username,
            email: user.username,
            image: user.profilePictureUrl || null,
          }
        } catch (error) {
          console.error("Ошибка авторизации:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-me",
})

