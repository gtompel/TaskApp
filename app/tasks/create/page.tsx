import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"

export default async function CreateTaskPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth/login")
  }

  const projects = await db.project.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const teams = await db.team.findMany({
    include: {
      user: true,
    },
    orderBy: {
      teamName: "asc",
    },
  })

  const defaultProjectId =
    typeof searchParams.projectId === "string" ? Number.parseInt(searchParams.projectId) : undefined

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Создание задачи</h1>
        <p className="text-muted-foreground">Добавьте новую задачу в проект</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о задаче</CardTitle>
          <CardDescription>Заполните основные параметры задачи</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название задачи</Label>
            <Input id="title" placeholder="Название задачи" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" placeholder="Подробное описание задачи" rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">Проект</Label>
            <Select defaultValue={defaultProjectId?.toString()}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Выберите проект" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select defaultValue="todo">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Бэклог</SelectItem>
                  <SelectItem value="todo">К выполнению</SelectItem>
                  <SelectItem value="in_progress">В процессе</SelectItem>
                  <SelectItem value="review">На проверке</SelectItem>
                  <SelectItem value="done">Выполнено</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Приоритет</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Дата начала</Label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <Label>Срок выполнения</Label>
              <DatePicker />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignee">Исполнитель</Label>
            <Select>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="Назначить исполнителя" />
              </SelectTrigger>
              <SelectContent>
                {teams.flatMap((team) =>
                  team.user.map((user) => (
                    <SelectItem key={user.userId} value={user.userId.toString()}>
                      {user.username} ({team.teamName})
                    </SelectItem>
                  )),
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input id="tags" placeholder="дизайн, фронтенд, срочно" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/tasks">Отмена</Link>
          </Button>
          <Button>Создать задачу</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

