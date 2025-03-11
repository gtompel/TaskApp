import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import Link from "next/link"

export default function CreateProjectPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Создание проекта</h1>
        <p className="text-muted-foreground">Создайте новый проект и начните работу с задачами</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о проекте</CardTitle>
          <CardDescription>Введите основную информацию о проекте</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название проекта</Label>
            <Input id="name" placeholder="Название проекта" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" placeholder="Подробное описание проекта" rows={4} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Дата начала</Label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <Label>Дата окончания</Label>
              <DatePicker />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/projects">Отмена</Link>
          </Button>
          <Button>Создать проект</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

