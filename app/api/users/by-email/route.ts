import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    console.log("Поиск пользователя по email:", email)

    if (!email) {
      return NextResponse.json({ message: "Email не указан" }, { status: 400 })
    }

    const user = await db.user.findFirst({
      where: {
        username: email,
      },
      include: {
        team: true,
      },
    })

    console.log("Результат поиска пользователя:", user ? "Найден" : "Не найден")

    if (!user) {
      return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error)
    return NextResponse.json({ message: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

