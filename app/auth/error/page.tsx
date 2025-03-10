"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "Произошла ошибка при аутентификации"

  switch (error) {
    case "CredentialsSignin":
      errorMessage = "Неверный email или пароль"
      break
    case "OAuthAccountNotLinked":
      errorMessage = "Этот email уже используется с другим методом входа"
      break
    case "OAuthSignInError":
      errorMessage = "Ошибка при входе через социальную сеть"
      break
    case "AccessDenied":
      errorMessage = "Доступ запрещен"
      break
    case "Configuration":
      errorMessage = "Ошибка конфигурации сервера"
      break
    default:
      errorMessage = "Произошла ошибка при аутентификации"
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-destructive">Ошибка аутентификации</CardTitle>
          <CardDescription>Не удалось выполнить вход в систему</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4">{errorMessage}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/auth/login">Вернуться на страницу входа</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

