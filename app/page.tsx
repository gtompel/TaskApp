import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать в ТаскТрекер</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Система управления проектами и задачами для эффективной работы команды
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/auth/login">Войти</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/auth/register">Зарегистрироваться</Link>
        </Button>
      </div>
    </div>
  )
}

