import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { TasksList } from "@/components/tasks-list"

export default async function TasksPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const tasks = await db.task.findMany({
    include: {
      project: true,
      assignee: true,
      author: true,
    },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
  })

  // Группируем задачи по статусу
  const tasksByStatus: Record<string, typeof tasks> = {}

  tasks.forEach((task) => {
    const status = task.status || "other"
    if (!tasksByStatus[status]) {
      tasksByStatus[status] = []
    }
    tasksByStatus[status].push(task)
  })

  return <TasksList tasksByStatus={tasksByStatus} />
}

