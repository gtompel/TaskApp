import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PencilIcon, Plus } from "lucide-react"
import { use } from "react"

interface TeamPageProps {
  params: {
    id: string
  }
}

export default function TeamPage({ params }: TeamPageProps) {
  // Используем React.use для обработки params
  const unwrappedParams = use(Promise.resolve(params))
  const teamId = Number.parseInt(unwrappedParams.id)

  if (isNaN(teamId)) {
    notFound()
  }

  const teamPromise = db.team.findUnique({
    where: { id: teamId },
    include: {
      user: true,
      projectTeams: {
        include: {
          project: true,
        },
      },
    },
  })

  const team = use(teamPromise)

  if (!team) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{team.teamName}</h1>
          <p className="text-muted-foreground mt-1">ID команды: {team.id}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/teams/${team.id}/edit`}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Редактировать
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Участники команды</CardTitle>
            <Button asChild size="sm">
              <Link href={`/teams/${team.id}/add-member`}>
                <Plus className="mr-2 h-4 w-4" />
                Добавить участника
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {team.user.length > 0 ? (
              <div className="space-y-4">
                {team.user.map((user) => (
                  <div key={user.userId} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profilePictureUrl || undefined} />
                        <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground">ID: {user.userId}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Профиль
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">В команде пока нет участников</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Проекты команды</CardTitle>
            <Button asChild size="sm">
              <Link href={`/teams/${team.id}/add-project`}>
                <Plus className="mr-2 h-4 w-4" />
                Добавить проект
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {team.projectTeams.length > 0 ? (
              <div className="space-y-4">
                {team.projectTeams.map((pt) => (
                  <div key={pt.id} className="p-4 border rounded-lg">
                    <div className="font-medium">{pt.project.name}</div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {pt.project.description || "Нет описания"}
                    </p>
                    <Button asChild className="mt-2" size="sm" variant="outline">
                      <Link href={`/projects/${pt.project.id}`}>Перейти к проекту</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">Команда не участвует ни в одном проекте</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

