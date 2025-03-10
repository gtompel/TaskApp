import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return "Не указано"
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export const taskPriorities = [
  { value: "high", label: "Высокий", color: "bg-red-500" },
  { value: "medium", label: "Средний", color: "bg-yellow-500" },
  { value: "low", label: "Низкий", color: "bg-green-500" },
]

export const taskStatuses = [
  { value: "backlog", label: "Бэклог" },
  { value: "todo", label: "К выполнению" },
  { value: "in_progress", label: "В процессе" },
  { value: "review", label: "На проверке" },
  { value: "done", label: "Выполнено" },
]

export function getPriorityLabel(priority: string | null | undefined): string {
  return taskPriorities.find((p) => p.value === priority)?.label || "Не указан"
}

export function getStatusLabel(status: string | null | undefined): string {
  return taskStatuses.find((s) => s.value === status)?.label || "Не указан"
}

export function getPriorityColor(priority: string | null | undefined): string {
  return taskPriorities.find((p) => p.value === priority)?.color || "bg-gray-500"
}

