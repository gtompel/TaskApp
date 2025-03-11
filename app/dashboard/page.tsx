import { Dashboard } from "@/components/dashboard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    redirect("/auth/login")
  }

  // Получаем пользователя из базы данных по email
  const user = await db.user.findFirst({
    where: {
      username: session.user.email,
    },
  })

  if (!user) {
    redirect("/auth/login")
  }

  return <Dashboard userId={user.userId} />
}

