import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Простая функция middleware, которая просто пропускает все запросы
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Если вы хотите полностью отключить middleware для всех путей,
// можно оставить пустой конфиг
export const config = {
  matcher: [], // Пустой массив означает, что middleware не будет применяться ни к одному пути
}

