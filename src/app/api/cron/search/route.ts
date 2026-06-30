import { NextResponse } from "next/server"
import { extractNoticesFromSearch, ingestNotices } from "@/lib/ai-search"

/**
 * GET /api/cron/search
 * 定时触发 AI 搜索（由 Vercel Cron 或其他定时服务调用）
 * 需要 CRON_SECRET 验证
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // 搜索关键词列表
    const queries = [
      "2026年 夏令营 985高校 计算机 人工智能 报名通知",
      "2026年 夏令营 211高校 经管 金融 会计 报名通知",
      "2026年 预推免 985 211 报名通知",
    ]

    let allNotices: Awaited<
      ReturnType<typeof extractNoticesFromSearch>
    > = []

    for (const query of queries) {
      // TODO: 这里接入真实的网页搜索 API
      // 目前先跳过，等用户配置搜索 API
      console.log(`Searching: ${query}`)
    }

    if (allNotices.length > 0) {
      const result = await ingestNotices(allNotices)
      return NextResponse.json({ success: true, ...result })
    }

    return NextResponse.json({
      success: true,
      message: "搜索完成，未发现新通知",
      newCount: 0,
    })
  } catch (error) {
    console.error("AI search failed:", error)
    return NextResponse.json(
      { error: "AI search failed", detail: String(error) },
      { status: 500 }
    )
  }
}
