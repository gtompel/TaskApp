import { Badge } from "@/components/ui/badge"
import { getStatusLabel } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface TaskStatusBadgeProps {
  status: string | null | undefined
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const statusStyles = {
    backlog: "bg-slate-500",
    todo: "bg-blue-500",
    in_progress: "bg-yellow-500",
    review: "bg-purple-500",
    done: "bg-green-500",
  }

  const statusClass = status ? statusStyles[status as keyof typeof statusStyles] : "bg-gray-500"

  return <Badge className={cn(statusClass, "text-white")}>{getStatusLabel(status)}</Badge>
}

