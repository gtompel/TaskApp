import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { TaskDetailsClient } from "@/components/task-details-client"

interface TaskPageProps {
  params: {
    id: string
  }
}

export default async function TaskPage({ params }: TaskPageProps) {
  const taskId = Number.parseInt(params.id)

  if (isNaN(taskId)) {
    notFound()
  }

  const task = await db.task.findUnique({
    where: { id: taskId },
    include: {
      project: true,
      author: true,
      assignee: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          id: "desc",
        },
      },
      attachments: {
        include: {
          uploadedBy: true,
        },
        orderBy: {
          id: "desc",
        },
      },
    },
  })

  if (!task) {
    notFound()
  }

  return <TaskDetailsClient task={task} />
}

