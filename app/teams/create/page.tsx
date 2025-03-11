import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function CreateTeamPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Создание команды</h1>
        <p className="text-muted-foreground">Создайте новую команду для вашего проекта</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о команде</CardTitle>
          <CardDescription>Введите основную информацию о команде</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название команды</Label>
            <Input id="name" placeholder="Название команды" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание (опционально)</Label>
            <Textarea id="description" placeholder="Короткое описание команды и её целей" rows={4} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/teams">Отмена</Link>
          </Button>
          <Button>Создать команду</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

