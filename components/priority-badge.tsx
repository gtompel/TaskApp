import { Badge } from "@/components/ui/badge"
import { getPriorityLabel, getPriorityColor } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PriorityBadgeProps {
  priority: string | null | undefined
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const priorityClass = getPriorityColor(priority)

  return (
    <Badge variant="outline" className={cn("border-2", priorityClass, "bg-transparent text-foreground")}>
      {getPriorityLabel(priority)}
    </Badge>
  )
}

