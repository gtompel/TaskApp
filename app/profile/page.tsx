"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

interface User {
  userId: number
  cognitoId: string
  username: string
  profilePictureUrl: string | null
  teamId: number | null
  team?: {
    teamName: string
  }
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }

    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/users/by-email?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user)
          }
          setLoading(false)
        })
        .catch((err) => {
          console.error("Ошибка получения пользователя:", err)
          setLoading(false)
        })
    }
  }, [status, session, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Пользователь не найден</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Профиль пользователя</h1>

      <Card>
        <CardHeader>
          <CardTitle>Информация о пользователе</CardTitle>
          <CardDescription>Ваши персональные данные и настройки</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profilePictureUrl || undefined} />
              <AvatarFallback className="text-lg">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-muted-foreground">ID: {user.userId}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Имя пользователя</h3>
              <p>{user.username}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">ID пользователя</h3>
              <p>{user.cognitoId}</p>
            </div>

            {user.team && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Команда</h3>
                <p>{user.team.teamName}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

