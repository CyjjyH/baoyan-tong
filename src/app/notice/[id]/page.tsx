import { notFound } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/db"

const levelLabels: Record<string, string> = {
  "985": "985",
  "211": "211",
  DOUBLE_FIRST_CLASS: "双一流",
  OTHER: "普通本科",
}

function formatDate(d: Date | null | undefined): string {
  if (!d) return "待定"
  return new Date(d).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const notice = await db.notice.findUnique({
    where: { id },
  })

  if (!notice) {
    notFound()
  }

  const typeLabel =
    notice.type === "SUMMER_CAMP" ? "夏令营" : "预推免"

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* 返回 */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← 返回列表
      </Link>

      {/* 标题区 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
            {typeLabel}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">
            {levelLabels[notice.schoolLevel] || notice.schoolLevel}
          </span>
          <span className="text-xs text-muted-foreground">
            {notice.province} · {notice.city}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          {notice.schoolName}
        </h1>
        <p className="text-lg text-muted-foreground">{notice.college}</p>
      </div>

      {/* 核心信息卡片 */}
      <div className="rounded-lg border border-border bg-white p-6 mb-6">
        <h2 className="text-base font-semibold text-foreground mb-4">
          基本信息
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoItem
            label="专业方向"
            value={notice.major}
          />
          <InfoItem
            label="报名时间"
            value={`${formatDate(notice.applicationStartDate)} — ${formatDate(notice.applicationEndDate)}`}
          />
          <InfoItem
            label="活动时间"
            value={
              notice.activityStartDate
                ? `${formatDate(notice.activityStartDate)} — ${formatDate(notice.activityEndDate)}`
                : "待定"
            }
          />
          <InfoItem
            label="学校所在地"
            value={`${notice.province} ${notice.city}`}
          />
        </div>
      </div>

      {/* 链接 */}
      {(notice.applicationLink || notice.originalLink) && (
        <div className="rounded-lg border border-border bg-white p-6 mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">
            相关链接
          </h2>
          <div className="flex flex-wrap gap-3">
            {notice.applicationLink && (
              <a
                href={notice.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-primary text-primary-foreground h-9 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                前往报名 →
              </a>
            )}
            {notice.originalLink && (
              <a
                href={notice.originalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border bg-white text-foreground h-9 px-4 text-sm font-medium hover:bg-muted transition-colors"
              >
                查看原文 ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* 申请要求 */}
      {notice.requirements && (
        <div className="rounded-lg border border-border bg-white p-6 mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">
            申请要求
          </h2>
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
            {notice.requirements}
          </pre>
        </div>
      )}

      {/* 所需材料 */}
      {notice.materials && (
        <div className="rounded-lg border border-border bg-white p-6 mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">
            所需材料
          </h2>
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
            {notice.materials}
          </pre>
        </div>
      )}

      {/* 来源 */}
      <p className="text-xs text-muted-foreground text-center">
        数据来源：{notice.source === "AI" ? "AI 自动搜集" : notice.source === "USER_SUBMISSION" ? "用户投稿" : "管理员录入"}
      </p>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground mb-0.5">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}
