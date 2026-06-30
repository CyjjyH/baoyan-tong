"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerAction } from "@/lib/auth-actions"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    const result = await registerAction(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground text-center mb-2">
        注册保研通
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        已有账号？
        <Link href="/login" className="text-primary hover:underline ml-1">
          登录
        </Link>
      </p>

      <form
        action={handleSubmit}
        className="rounded-lg border border-border bg-white p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            昵称
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="你的昵称"
            className="w-full h-10 rounded-md border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

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
            placeholder="至少6位"
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
          {loading ? "注册中..." : "注册"}
        </button>
      </form>
    </div>
  )
}
