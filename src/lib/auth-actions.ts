"use server"

import { hash } from "bcryptjs"
import { signIn, signOut } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password || !name) {
    return { error: "请填写所有字段" }
  }

  if (password.length < 6) {
    return { error: "密码至少6位" }
  }

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return { error: "该邮箱已被注册" }
  }

  const hashedPassword = await hash(password, 12)
  await db.user.create({
    data: { email, name, hashedPassword },
  })

  await signIn("credentials", { email, password, redirect: false })
  redirect("/dashboard")
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "请输入邮箱和密码" }
  }

  try {
    await signIn("credentials", { email, password, redirect: false })
  } catch {
    return { error: "邮箱或密码错误" }
  }

  redirect("/dashboard")
}

export async function logoutAction() {
  "use server"
  await signOut({ redirect: false })
  redirect("/")
}
