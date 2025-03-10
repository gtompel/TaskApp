import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Attachment, User } from "@prisma/client"
import { FileIcon, DownloadIcon, UploadIcon } from "lucide-react"

interface TaskAttachmentsProps {
  attachments: (Attachment & { uploadedBy: User })[]
  taskId: number
}

export function TaskAttachments({ attachments, taskId }: TaskAttachmentsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Вложения</h3>
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Загрузить файл
        </Button>
      </div>

      {attachments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Нет вложений</div>
      ) : (
        <div className="space-y-4">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-secondary p-2 rounded-md">
                  <FileIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{attachment.fileName || "Файл"}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={attachment.uploadedBy.profilePictureUrl || undefined} />
                      <AvatarFallback>{attachment.uploadedBy.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{attachment.uploadedBy.username}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-4 w-4" />
                <span className="sr-only">Скачать</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

