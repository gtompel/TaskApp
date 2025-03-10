import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

export default async function TeamsPage() {
  const teams = await db.team.findMany({
    include: {
      user: true,
      projectTeams: {
        include: {
          project: true,
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Команды</h1>
          <p className="text-muted-foreground">Управление командами и участниками проектов</p>
        </div>
        <Button asChild>
          <Link href="/teams/create">
            <Plus className="mr-2 h-4 w-4" />
            Создать команду
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle>{team.teamName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Участники ({team.user.length})</p>
                  <div className="flex -space-x-2 mt-2">
                    {team.user.slice(0, 5).map((user) => (
                      <Avatar key={user.userId} className="border-2 border-background">
                        <AvatarImage src={user.profilePictureUrl || undefined} />
                        <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ))}
                    {team.user.length > 5 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-xs">
                        +{team.user.length - 5}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Проекты ({team.projectTeams.length})</p>
                  <div className="mt-2 space-y-1">
                    {team.projectTeams.slice(0, 3).map((pt) => (
                      <p key={pt.id} className="text-sm truncate">
                        {pt.project.name}
                      </p>
                    ))}
                    {team.projectTeams.length > 3 && (
                      <p className="text-sm text-muted-foreground">И еще {team.projectTeams.length - 3}...</p>
                    )}
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/teams/${team.id}`}>Просмотр команды</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {teams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">Нет команд</p>
            <Button asChild className="mt-4">
              <Link href="/teams/create">
                <Plus className="mr-2 h-4 w-4" />
                Создать первую команду
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

