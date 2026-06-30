"use client"

import Link from "next/link"
import { logoutAction } from "@/lib/auth-actions"

export function UserMenu({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        个人中心
      </Link>
      <span className="text-sm text-foreground font-medium hidden sm:inline">
        {name}
      </span>
      <form action={logoutAction}>
        <button
          type="submit"
          className="text-sm text-muted-foreground hover:text-red-600 transition-colors"
        >
          退出
        </button>
      </form>
    </div>
  )
}
