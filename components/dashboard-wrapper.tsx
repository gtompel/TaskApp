"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function DashboardWrapper() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }

    // Если пользователь аутентифицирован, перенаправляем на дашборд
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  // Если статус загрузки, показываем индикатор загрузки
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Если пользователь не аутентифицирован, показываем приветственный экран
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

