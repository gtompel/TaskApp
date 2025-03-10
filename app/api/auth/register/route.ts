import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    // Проверка наличия всех необходимых полей
    if (!username || !email || !password) {
      return NextResponse.json({ message: "Отсутствуют обязательные поля" }, { status: 400 })
    }

    // Проверка, существует ли пользователь с таким email
    const existingUser = await db.user.findFirst({
      where: {
        username: email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Пользователь с таким email уже существует" }, { status: 409 })
    }

    // Создание нового пользователя
    const user = await db.user.create({
      data: {
        cognitoId: `local-${Date.now()}`, // Генерируем уникальный ID для локальных пользователей
        username: email, // Используем email как username
        profilePictureUrl: null,
      },
    })

    // Удаляем чувствительные данные из ответа
    const { cognitoId, ...userWithoutSensitiveInfo } = user

    return NextResponse.json(
      { message: "Пользователь успешно зарегистрирован", user: userWithoutSensitiveInfo },
      { status: 201 },
    )
  } catch (error) {
    console.error("Ошибка при регистрации:", error)
    return NextResponse.json({ message: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

