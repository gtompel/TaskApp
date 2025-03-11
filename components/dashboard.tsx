import { db } from "@/lib/db"
import { DashboardClient } from "./dashboard-client"

export async function Dashboard({ userId }: { userId: number }) {
  // Получаем проекты, в которых участвует пользователь через его команду
  const user = await db.user.findUnique({
    where: { userId },
    include: {
      team: {
        include: {
          projectTeams: {
            include: {
              project: true,
            },
          },
        },
      },
      assignedTasks: {
        take: 5,
        orderBy: { dueDate: "asc" },
        where: {
          status: {
            not: "done",
          },
        },
      },
    },
  })

  const projects = user?.team?.projectTeams.map((pt) => pt.project) || []
  const tasks = user?.assignedTasks || []

  // Получаем статистику
  const tasksCount = await db.task.count({
    where: {
      assignedUserId: userId,
    },
  })

  const completedTasksCount = await db.task.count({
    where: {
      assignedUserId: userId,
      status: "done",
    },
  })

  const pendingTasksCount = tasksCount - completedTasksCount

  return (
    <DashboardClient
      projects={projects}
      tasks={tasks}
      stats={{
        tasksCount,
        completedTasksCount,
        pendingTasksCount,
      }}
    />
  )
}

