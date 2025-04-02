import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/authOption";
import { db } from "@/lib/db";

// POST method for creating a project
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Требуется авторизация" }, { status: 401 });
  }

  try {
    const { name, description, startDate, endDate } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Название проекта обязательно" }, { status: 400 });
    }

    const project = await db.project.create({
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании проекта:", error);
    return NextResponse.json({ message: "Не удалось создать проект", error: error.message }, { status: 500 });
  }
}

// GET method for fetching projects
export async function GET() {
  try {
    const projects = await db.project.findMany();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении проектов:", error);
    return NextResponse.json({ message: "Не удалось получить проекты", error: error.message }, { status: 500 });
  }
}