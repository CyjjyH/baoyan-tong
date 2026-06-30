"use client"

import { useState } from "react"
import Link from "next/link"
import { loginAction } from "@/lib/auth-actions"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    const result = await loginAction(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground text-center mb-2">
        登录保研通
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        还没有账号？
        <Link href="/register" className="text-primary hover:underline ml-1">
          注册
        </Link>
      </p>

      <form
        action={handleSubmit}
        className="rounded-lg border border-border bg-white p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            邮箱
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full h-10 rounded-md border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            密码
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="输入密码"
            className="w-full h-10 rounded-md border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "登录中..." : "登录"}
        </button>
      </form>
    </div>
  )
}
