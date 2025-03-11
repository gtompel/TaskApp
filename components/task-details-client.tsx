"use client"

import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskStatusBadge } from "@/components/task-status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskComments } from "@/components/task-comments"
import { TaskAttachments } from "@/components/task-attachments"
import Link from "next/link"
import { PencilIcon, ClipboardIcon } from "lucide-react"
import { useCallback } from "react"

interface Task {
  id: number
  title: string
  description: string | null
  status: string | null
  priority: string | null
  points: number | null
  startDate: Date | null
  dueDate: Date | null
  tags: string | null
  project: {
    id: number
    name: string
  }
  author: {
    username: string
    profilePictureUrl: string | null
  }
  assignee: {
    username: string
    profilePictureUrl: string | null
  } | null
  comments: Array<{
    id: number
    text: string
    user: {
      username: string
      profilePictureUrl: string | null
    }
  }>
  attachments: Array<{
    id: number
    fileName: string | null
    uploadedBy: {
      username: string
      profilePictureUrl: string | null
    }
  }>
}

interface TaskDetailsClientProps {
  task: Task
}

export function TaskDetailsClient({ task }: TaskDetailsClientProps) {
  const copyTaskId = useCallback(() => {
    navigator.clipboard.writeText(`#${task.id}`)
  }, [task.id])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyTaskId}>
              <ClipboardIcon className="h-4 w-4" />
              <span className="sr-only">Копировать ID задачи</span>
            </Button>
          </div>
          <p className="text-muted-foreground mt-1">
            Задача #{task.id} в проекте{" "}
            <Link href={`/projects/${task.project.id}`} className="hover:underline">
              {task.project.name}
            </Link>
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/tasks/${task.id}/edit`}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Редактировать
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о задаче</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Статус</p>
                  <div>
                    <TaskStatusBadge status={task.status} />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Приоритет</p>
                  <div>
                    <PriorityBadge priority={task.priority} />
                  </div>
                </div>
                {task.points && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Оценка (Story Points)</p>
                    <p>{task.points}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Дата начала</p>
                  <p>{formatDate(task.startDate)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Срок выполнения</p>
                  <p>{formatDate(task.dueDate)}</p>
                </div>
                {task.tags && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Теги</p>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Участники</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">Автор</div>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={task.author.profilePictureUrl || undefined} />
                      <AvatarFallback>{task.author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{task.author.username}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">Исполнитель</div>
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={task.assignee.profilePictureUrl || undefined} />
                        <AvatarFallback>{task.assignee.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span>{task.assignee.username}</span>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      Назначить
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2">
          <Tabs defaultValue="description">
            <CardHeader>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="comments">Комментарии ({task.comments.length})</TabsTrigger>
                <TabsTrigger value="attachments">Вложения ({task.attachments.length})</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="description" className="mt-0">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {task.description ? (
                    <div className="whitespace-pre-wrap">{task.description}</div>
                  ) : (
                    <p className="text-muted-foreground italic">Нет описания</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="comments" className="mt-0">
                <TaskComments comments={task.comments} taskId={task.id} />
              </TabsContent>
              <TabsContent value="attachments" className="mt-0">
                <TaskAttachments attachments={task.attachments} taskId={task.id} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

