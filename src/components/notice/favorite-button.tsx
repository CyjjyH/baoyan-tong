"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toggleFavorite } from "@/lib/favorite-actions"

export function FavoriteButton({
  noticeId,
  initialFavorited,
}: {
  noticeId: string
  initialFavorited: boolean
}) {
  const router = useRouter()
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    const result = await toggleFavorite(noticeId)
    if (result?.error) {
      router.push("/login")
    } else {
      setFavorited(!favorited)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-1 text-sm transition-colors ${
        favorited
          ? "text-amber-500 hover:text-amber-600"
          : "text-muted-foreground hover:text-amber-500"
      }`}
      title={favorited ? "取消收藏" : "收藏"}
    >
      {favorited ? "★" : "☆"}
    </button>
  )
}
