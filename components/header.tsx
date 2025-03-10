"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FolderKanban, CheckSquare, Menu, X, LogOut, LogIn } from "lucide-react"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const navItems = [
  {
    href: "/dashboard",
    label: "Дашборд",
    icon: LayoutDashboard,
  },
  {
    href: "/projects",
    label: "Проекты",
    icon: FolderKanban,
  },
  {
    href: "/tasks",
    label: "Задачи",
    icon: CheckSquare,
  },
  {
    href: "/teams",
    label: "Команды",
    icon: Users,
  },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/auth/login")
  }

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="font-bold text-xl mr-4">
            ТаскТрекер
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                  pathname === item.href ? "text-primary bg-muted" : "text-muted-foreground",
                )}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {status === "authenticated" ? (
            <>
              <Button asChild variant="default" size="sm">
                <Link href="/profile">Профиль</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/auth/login">
                <LogIn className="w-4 h-4 mr-2" />
                Войти
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden border-t p-4 space-y-2 bg-background">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                pathname === item.href ? "text-primary bg-muted" : "text-muted-foreground",
              )}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          ))}
          {status === "authenticated" ? (
            <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/auth/login">
                <LogIn className="w-4 h-4 mr-2" />
                Войти
              </Link>
            </Button>
          )}
        </div>
      )}
    </header>
  )
}

