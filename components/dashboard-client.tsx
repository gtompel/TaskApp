"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TaskStatusBadge } from "@/components/task-status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { formatDate } from "@/lib/utils"

interface Project {
  id: number
  name: string
  description: string | null
  startDate: Date | null
  endDate: Date | null
}

interface Task {
  id: number
  title: string
  description: string | null
  status: string | null
  priority: string | null
  dueDate: Date | null
}

interface DashboardClientProps {
  projects: Project[]
  tasks: Task[]
  stats: {
    tasksCount: number
    completedTasksCount: number
    pendingTasksCount: number
  }
}

export function DashboardClient({ projects, tasks, stats }: DashboardClientProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-muted-foreground">Добро пожаловать в систему управления проектами и задачами</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего задач</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasksCount}</div>
            <p className="text-xs text-muted-foreground">Общее количество ваших задач</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выполненные задачи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTasksCount}</div>
            <p className="text-xs text-muted-foreground">Задачи со статусом "Выполнено"</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ожидающие задачи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasksCount}</div>
            <p className="text-xs text-muted-foreground">Задачи, которые еще не выполнены</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Мои проекты</CardTitle>
            <CardDescription>Проекты, в которых вы участвуете</CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="font-medium">{project.name}</div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {project.description || "Нет описания"}
                    </p>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </div>
                    <Button asChild className="mt-2" size="sm" variant="outline">
                      <Link href={`/projects/${project.id}`}>Перейти к проекту</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">У вас пока нет проектов</div>
            )}
            <div className="mt-4">
              <Button asChild>
                <Link href="/projects">Все проекты</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Мои задачи</CardTitle>
            <CardDescription>Ваши текущие задачи</CardDescription>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="font-medium">{task.title}</div>
                      <TaskStatusBadge status={task.status} />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {task.description || "Нет описания"}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      {task.dueDate && (
                        <span className="text-sm text-muted-foreground">Срок: {formatDate(task.dueDate)}</span>
                      )}
                    </div>
                    <Button asChild className="mt-2" size="sm" variant="outline">
                      <Link href={`/tasks/${task.id}`}>Подробнее</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">У вас пока нет задач</div>
            )}
            <div className="mt-4">
              <Button asChild>
                <Link href="/tasks">Все задачи</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


