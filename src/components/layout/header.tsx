"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
          </svg>
          <span>保研通</span>
        </Link>

        {/* 导航链接 */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            首页
          </Link>
          <Link href="/notices" className="hover:text-foreground transition-colors">
            全部通知
          </Link>
        </nav>

        {/* 右侧操作 */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm">
              登录
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">
              注册
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
