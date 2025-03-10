import { db } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    include: {
      tasks: true,
      projectTeams: {
        include: {
          team: true,
        },
      },
    },
    orderBy: {
      startDate: "desc",
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Проекты</h1>
          <p className="text-muted-foreground">Управляйте вашими проектами и отслеживайте их прогресс</p>
        </div>
        <Button asChild>
          <Link href="/projects/create">
            <Plus className="mr-2 h-4 w-4" />
            Создать проект
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description || "Нет описания"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Дата начала:</span>
                  <span>{formatDate(project.startDate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Дата окончания:</span>
                  <span>{formatDate(project.endDate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Всего задач:</span>
                  <span>{project.tasks.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Команд:</span>
                  <span>{project.projectTeams.length}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/projects/${project.id}`}>Открыть проект</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">У вас пока нет проектов</p>
            <Button asChild className="mt-4">
              <Link href="/projects/create">
                <Plus className="mr-2 h-4 w-4" />
                Создать первый проект
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

