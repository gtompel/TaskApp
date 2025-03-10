import { TaskStatusBadge } from "@/components/task-status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Task, User } from "@prisma/client"

interface ProjectTasksProps {
  tasks: (Task & { assignee: User | null })[]
  projectId: number
}

export function ProjectTasks({ tasks, projectId }: ProjectTasksProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">В этом проекте пока нет задач</p>
        <Button asChild className="mt-4">
          <Link href={`/tasks/create?projectId=${projectId}`}>Создать первую задачу</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Приоритет</TableHead>
          <TableHead>Исполнитель</TableHead>
          <TableHead>Срок</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>
              <TaskStatusBadge status={task.status} />
            </TableCell>
            <TableCell>
              <PriorityBadge priority={task.priority} />
            </TableCell>
            <TableCell>
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.profilePictureUrl || undefined} />
                    <AvatarFallback>{task.assignee.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{task.assignee.username}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Не назначен</span>
              )}
            </TableCell>
            <TableCell>{formatDate(task.dueDate)}</TableCell>
            <TableCell className="text-right">
              <Button asChild size="sm" variant="ghost">
                <Link href={`/tasks/${task.id}`}>Открыть</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

