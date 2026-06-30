import { Suspense } from "react"
import { db } from "@/lib/db"
import { NoticeCard } from "@/components/notice/notice-card"
import { SearchFilter } from "@/components/search/search-filter"

export const dynamic = "force-dynamic"

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function NoticeList({ searchParams }: HomePageProps) {
  const params = await searchParams

  // 构建筛选条件
  const where: Record<string, unknown> = { status: "PUBLISHED" }

  // 关键词搜索
  if (params.keyword && typeof params.keyword === "string") {
    const kw = params.keyword.trim()
    where.OR = [
      { title: { contains: kw } },
      { schoolName: { contains: kw } },
      { college: { contains: kw } },
      { major: { contains: kw } },
    ]
  }

  // 通知类型
  if (params.type && typeof params.type === "string") {
    where.type = params.type
  }

  // 学校等级 (逗号分隔多选)
  if (params.levels && typeof params.levels === "string") {
    const levels = params.levels.split(",").filter(Boolean)
    if (levels.length > 0) {
      where.schoolLevel = { in: levels }
    }
  }

  // 省份
  if (params.province && typeof params.province === "string") {
    where.province = params.province
  }

  const notices = await db.notice.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  // 提取可用的省份列表（从当前结果中）
  const allNotices = await db.notice.findMany({
    where: { status: "PUBLISHED" },
    select: { province: true },
    distinct: ["province"],
    orderBy: { province: "asc" },
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 搜索英雄区 */}
      <section className="rounded-xl bg-secondary px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          找到属于你的夏令营
        </h1>
        <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-2xl">
          汇集全国高校夏令营与预推免通知，按专业、学校、时间精准筛选
        </p>

        <Suspense fallback={<FilterSkeleton />}>
          <SearchFilter />
        </Suspense>
      </section>

      {/* 通知列表 */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            通知列表
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              共 {notices.length} 条
            </span>
          </h2>
        </div>

        {notices.length > 0 ? (
          <div className="space-y-3">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                id={notice.id}
                schoolName={notice.schoolName}
                college={notice.college}
                major={notice.major}
                type={notice.type}
                schoolLevel={notice.schoolLevel}
                province={notice.province}
                city={notice.city}
                applicationEndDate={notice.applicationEndDate}
                activityStartDate={notice.activityStartDate}
                activityEndDate={notice.activityEndDate}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-white p-12 text-center">
            <p className="text-muted-foreground">
              {params.keyword || params.type || params.levels || params.province
                ? "没有匹配的通知，试试调整筛选条件"
                : "还没有通知数据"}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

function FilterSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 h-10 rounded-md bg-white/60 animate-pulse" />
        <div className="w-48 h-10 rounded-md bg-white/60 animate-pulse" />
      </div>
      <div className="flex gap-2">
        <div className="w-16 h-7 rounded-full bg-white/60 animate-pulse" />
        <div className="w-16 h-7 rounded-full bg-white/60 animate-pulse" />
        <div className="w-16 h-7 rounded-full bg-white/60 animate-pulse" />
      </div>
    </div>
  )
}

export default NoticeList
