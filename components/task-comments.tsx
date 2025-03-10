import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Comment, User } from "@prisma/client"
import { PlaneIcon as PaperPlaneIcon } from "lucide-react"

interface TaskCommentsProps {
  comments: (Comment & { user: User })[]
  taskId: number
}

export function TaskComments({ comments, taskId }: TaskCommentsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Textarea placeholder="Добавить комментарий..." className="min-h-[100px]" />
        <Button size="icon" className="mt-1">
          <PaperPlaneIcon className="h-4 w-4" />
          <span className="sr-only">Отправить</span>
        </Button>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">Нет комментариев</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 border rounded-lg">
              <Avatar>
                <AvatarImage src={comment.user.profilePictureUrl || undefined} />
                <AvatarFallback>{comment.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{comment.user.username}</p>
                  <p className="text-sm text-muted-foreground">ID: {comment.id}</p>
                </div>
                <p className="mt-1 whitespace-pre-wrap">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

