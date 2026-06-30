import Link from "next/link"
import { auth } from "@/lib/auth"
import { UserMenu } from "./user-menu"

export async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
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

        {/* 导航 */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            首页
          </Link>
          <Link
            href="/submit"
            className="hover:text-foreground transition-colors"
          >
            投稿
          </Link>
        </nav>

        {/* 右侧 */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <UserMenu
              name={session.user.name || ""}
              email={session.user.email || ""}
            />
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                登录
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-9 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
