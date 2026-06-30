import { db } from "@/lib/db"
import { NoticeCard } from "@/components/notice/notice-card"

export default async function HomePage() {
  const notices = await db.notice.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 搜索英雄区 */}
      <section className="rounded-xl bg-secondary px-6 py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          找到属于你的夏令营
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          汇集全国高校夏令营与预推免通知，按专业、学校、时间精准筛选
        </p>

        <div className="mx-auto max-w-xl flex gap-2">
          <input
            type="text"
            placeholder="搜索学校、专业或关键词..."
            className="flex-1 h-10 rounded-md border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
            搜索
          </button>
        </div>
      </section>

      {/* 通知列表 */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            最新通知
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
            <p className="text-muted-foreground">还没有通知数据</p>
          </div>
        )}
      </section>
    </div>
  )
}
