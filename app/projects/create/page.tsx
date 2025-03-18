"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function CreateProjectPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Проект успешно создан!",
        })
        router.push("/projects")
      } else {
        const errorData = await response.json()
        toast({
          title: "Ошибка при создании проекта",
          description: errorData.message || "Что-то пошло не так.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Ошибка при создании проекта",
        description: error.message || "Что-то пошло не так.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            <Input
              id="name"
              placeholder="Название проекта"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Подробное описание проекта"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Дата начала</Label>
              <DatePicker selected={startDate} onSelect={(date) => setStartDate(date)} />
            </div>
            <div className="space-y-2">
              <Label>Дата окончания</Label>
              <DatePicker selected={endDate} onSelect={(date) => setEndDate(date)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/projects">Отмена</Link>
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Создание..." : "Создать проект"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
