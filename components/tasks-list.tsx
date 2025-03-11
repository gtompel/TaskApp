"use client"

import { TaskStatusBadge } from "@/components/task-status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Task {
  id: number
  title: string
  description: string | null
  status: string | null
  priority: string | null
  dueDate: Date | null
  project: {
    id: number
    name: string
  }
  assignee: {
    username: string
    profilePictureUrl: string | null
  } | null
}

interface TasksListProps {
  tasksByStatus: Record<string, Task[]>
}

export function TasksList({ tasksByStatus }: TasksListProps) {
  // Порядок отображения статусов
  const statusOrder = ["todo", "in_progress", "review", "backlog", "done", "other"]

  // Проверяем общее количество задач
  const totalTasks = Object.values(tasksByStatus).reduce((sum, tasks) => sum + tasks.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Задачи</h1>
          <p className="text-muted-foreground">Управляйте задачами по всем проектам</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
          <Button asChild>
            <Link href="/tasks/create">
              <Plus className="mr-2 h-4 w-4" />
              Создать задачу
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {statusOrder.map((status) => {
          const statusTasks = tasksByStatus[status] || []
          if (statusTasks.length === 0) return null

          return (
            <div key={status} className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TaskStatusBadge status={status} />
                <span>{statusTasks.length}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {statusTasks.map((task) => (
                  <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <Link href={`/tasks/${task.id}`} className="font-medium hover:underline line-clamp-1">
                          {task.title}
                        </Link>
                        <PriorityBadge priority={task.priority} />
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description || "Нет описания"}</p>

                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          Проект:{" "}
                          <Link href={`/projects/${task.project.id}`} className="hover:underline">
                            {task.project.name}
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div>{task.dueDate && <div>Срок: {formatDate(task.dueDate)}</div>}</div>

                        {task.assignee && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.profilePictureUrl || undefined} />
                              <AvatarFallback>{task.assignee.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{task.assignee.username}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/tasks/${task.id}`}>Открыть</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}

        {totalTasks === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Пока нет задач</p>
            <Button asChild className="mt-4">
              <Link href="/tasks/create">
                <Plus className="mr-2 h-4 w-4" />
                Создать первую задачу
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

