import { getServerSession } from "next-auth"
import { db } from "@/lib/db"

export async function getCurrentUser() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return null
    }

    // Получаем пользователя из базы данных по email
    const user = await db.user.findFirst({
      where: {
        username: session.user.email,
      },
    })

    return user
  } catch (error) {
    console.error("Ошибка получения текущего пользователя:", error)
    return null
  }
}

