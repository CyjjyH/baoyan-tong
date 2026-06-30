"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function toggleFavorite(noticeId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "请先登录" }
  }

  const existing = await db.favorite.findUnique({
    where: {
      userId_noticeId: {
        userId: session.user.id,
        noticeId,
      },
    },
  })

  if (existing) {
    await db.favorite.delete({ where: { id: existing.id } })
  } else {
    await db.favorite.create({
      data: { userId: session.user.id, noticeId },
    })
  }

  revalidatePath("/")
  revalidatePath(`/notice/${noticeId}`)
  revalidatePath("/dashboard")
}

export async function isFavorited(noticeId: string): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.id) return false

  const fav = await db.favorite.findUnique({
    where: {
      userId_noticeId: {
        userId: session.user.id,
        noticeId,
      },
    },
  })
  return !!fav
}
