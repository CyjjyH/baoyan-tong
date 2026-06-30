import Link from "next/link"

interface NoticeCardProps {
  id: string
  schoolName: string
  college: string
  major: string
  type: string
  schoolLevel: string
  province: string
  city: string
  applicationEndDate: Date
  activityStartDate?: Date | null
  activityEndDate?: Date | null
}

const levelColors: Record<string, string> = {
  "985": "bg-violet-100 text-violet-700",
  "211": "bg-cyan-100 text-cyan-700",
  DOUBLE_FIRST_CLASS: "bg-amber-100 text-amber-700",
  OTHER: "bg-slate-100 text-slate-600",
}

const levelLabels: Record<string, string> = {
  "985": "985",
  "211": "211",
  DOUBLE_FIRST_CLASS: "双一流",
  OTHER: "普通本科",
}

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
  })
}

function daysRemaining(d: Date): { text: string; urgent: boolean } {
  const now = new Date()
  const diff = Math.ceil((new Date(d).getTime() - now.getTime()) / 86400000)
  if (diff < 0) return { text: "已截止", urgent: false }
  if (diff <= 3) return { text: `仅剩 ${diff} 天`, urgent: true }
  if (diff <= 7) return { text: `剩余 ${diff} 天`, urgent: false }
  return { text: `${diff} 天后截止`, urgent: false }
}

export function NoticeCard({
  id,
  schoolName,
  college,
  major,
  type,
  schoolLevel,
  province,
  city,
  applicationEndDate,
  activityStartDate,
  activityEndDate,
}: NoticeCardProps) {
  const remaining = daysRemaining(applicationEndDate)
  const typeLabel = type === "SUMMER_CAMP" ? "夏令营" : "预推免"
  const typeStyle =
    type === "SUMMER_CAMP"
      ? "bg-blue-100 text-blue-700"
      : "bg-emerald-100 text-emerald-700"

  return (
    <Link
      href={`/notice/${id}`}
      className="group block rounded-lg border border-border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* 左侧蓝色标识条 */}
      <div className="flex gap-4">
        <div className="hidden sm:block w-1 rounded-full bg-primary shrink-0" />

        <div className="flex-1 min-w-0 space-y-2.5">
          {/* 学校 + 学院 */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {schoolName}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {college}
              </p>
            </div>

            {/* 标签 */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeStyle}`}>
                {typeLabel}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${levelColors[schoolLevel] || levelColors.OTHER}`}
              >
                {levelLabels[schoolLevel] || schoolLevel}
              </span>
            </div>
          </div>

          {/* 专业 */}
          <p className="text-sm text-foreground font-medium">{major}</p>

          {/* 底部信息行 */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>
              {province} · {city}
            </span>
            <div className="flex items-center gap-3">
              {activityStartDate && (
                <span>
                  活动: {formatDate(activityStartDate)}
                  {activityEndDate ? ` — ${formatDate(activityEndDate)}` : ""}
                </span>
              )}
              <span
                className={
                  remaining.urgent
                    ? "text-red-600 font-semibold"
                    : "text-muted-foreground"
                }
              >
                📅 {remaining.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
