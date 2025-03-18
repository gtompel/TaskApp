import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { db } from "@/lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не разрешен" })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: "Требуется авторизация" })
  }

  try {
    const { name, description, startDate, endDate } = req.body

    if (!name) {
      return res.status(400).json({ message: "Название проекта обязательно" })
    }

    // Optional: Validate date formats here

    const project = await db.project.create({
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    })

    return res.status(201).json({ project })
  } catch (error) {
    console.error("Ошибка при создании проекта:", error)
    return res.status(500).json({ message: "Не удалось создать проект", error: error })
  }
}