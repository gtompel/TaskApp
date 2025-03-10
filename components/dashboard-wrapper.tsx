"use client"

import { useSession } from "next-auth/react"
import { Dashboard } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function DashboardWrapper() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }

    // Если пользователь аутентифицирован, получаем его ID
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/users/by-email?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUserId(data.user.userId)
          }
        })
        .catch((err) => console.error("Ошибка получения пользователя:", err))
    }
  }, [status, session, router])

  // Если статус загрузки, показываем индикатор загрузки
  if (status === "loading" || (status === "authenticated" && !userId)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Если пользователь не аутентифицирован, показываем приветственный экран
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold mb-4">Добро пожаловать в ТаскТрекер</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Система управления проектами и задачами для эффективной работы команды
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/auth/login">Войти</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/register">Зарегистрироваться</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Если пользователь аутентифицирован и у нас есть userId, показываем дашборд
  return <Dashboard userId={userId} />
}

