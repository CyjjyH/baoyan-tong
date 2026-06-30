import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

function formatDate(d: Date | null): string {
  if (!d) return "-"
  return new Date(d).toLocaleString("zh-CN")
}

export default async function AdminPage() {
  const logs = await db.aiSearchLog.findMany({
    orderBy: { startedAt: "desc" },
    take: 20,
  })

  const aiNotices = await db.notice.findMany({
    where: { source: "AI" },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">管理后台</h1>

      {/* AI 搜索日志 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          AI 搜索日志
        </h2>
        <div className="rounded-lg border border-border bg-white overflow-hidden">
          {logs.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">搜索词</th>
                  <th className="text-left px-4 py-2 font-medium">结果数</th>
                  <th className="text-left px-4 py-2 font-medium">新增</th>
                  <th className="text-left px-4 py-2 font-medium">重复</th>
                  <th className="text-left px-4 py-2 font-medium">状态</th>
                  <th className="text-left px-4 py-2 font-medium">时间</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-t border-border">
                    <td className="px-4 py-2 text-muted-foreground truncate max-w-[200px]">
                      {log.searchQuery}
                    </td>
                    <td className="px-4 py-2">{log.resultsCount}</td>
                    <td className="px-4 py-2 text-green-600">{log.newNotices}</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {log.duplicates}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          log.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : log.status === "FAILED"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {log.status === "COMPLETED"
                          ? "完成"
                          : log.status === "FAILED"
                            ? "失败"
                            : "运行中"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">
                      {formatDate(log.startedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              暂无搜索记录
            </div>
          )}
        </div>
      </section>

      {/* AI 入库通知 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          AI 入库通知 ({aiNotices.length})
        </h2>
        <div className="space-y-2">
          {aiNotices.length > 0 ? (
            aiNotices.map((n) => (
              <div
                key={n.id}
                className="rounded-lg border border-border bg-white p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {n.schoolName} · {n.college}
                  </p>
                  <p className="text-xs text-muted-foreground">{n.title}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{n.type === "SUMMER_CAMP" ? "夏令营" : "预推免"}</span>
                  <span>{new Date(n.applicationEndDate).toLocaleDateString("zh-CN")} 截止</span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-white p-8 text-center">
              <p className="text-sm text-muted-foreground">暂无 AI 入库通知</p>
              <p className="text-xs text-muted-foreground mt-1">
                AI 搜索将在配置定时任务后自动运行
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
