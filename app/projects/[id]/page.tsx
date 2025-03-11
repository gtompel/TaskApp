import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectTasks } from "@/components/project-tasks"
import { ProjectTeams } from "@/components/project-teams"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PencilIcon, Plus } from "lucide-react"
import { use } from "react"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // Используем React.use для обработки params
  const unwrappedParams = use(Promise.resolve(params))
  const projectId = Number.parseInt(unwrappedParams.id)

  if (isNaN(projectId)) {
    notFound()
  }

  const projectPromise = db.project.findUnique({
    where: { id: projectId },
    include: {
      tasks: {
        include: {
          assignee: true,
        },
      },
      projectTeams: {
        include: {
          team: true,
        },
      },
    },
  })

  const project = use(projectPromise)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.description || "Нет описания"}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/projects/${project.id}/edit`}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Редактировать
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Информация о проекте</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Дата начала</p>
                <p>{formatDate(project.startDate)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Дата окончания</p>
                <p>{formatDate(project.endDate)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Команды</p>
                <p>{project.projectTeams.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Задачи</p>
                <p>{project.tasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="tasks">
            <CardHeader>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="tasks">Задачи</TabsTrigger>
                  <TabsTrigger value="teams">Команды</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/tasks/create?projectId=${project.id}`}>
                      <Plus className="mr-1 h-3 w-3" />
                      Задача
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/projects/${project.id}/assign-team`}>
                      <Plus className="mr-1 h-3 w-3" />
                      Команда
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="tasks" className="mt-0">
                <ProjectTasks tasks={project.tasks} projectId={project.id} />
              </TabsContent>
              <TabsContent value="teams" className="mt-0">
                <ProjectTeams teams={project.projectTeams} projectId={project.id} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

