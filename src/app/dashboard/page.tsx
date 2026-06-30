import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { logoutAction } from "@/lib/auth-actions"

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const favorites = await db.favorite.findMany({
    where: { userId: session.user.id },
    include: { notice: true },
    orderBy: { createdAt: "desc" },
  })

  const subscriptions = await db.subscription.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">个人中心</h1>
      <p className="text-sm text-muted-foreground mb-8">{session.user.email}</p>

      {/* 我的收藏 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          我的收藏
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {favorites.length} 条
          </span>
        </h2>

        {favorites.length > 0 ? (
          <div className="space-y-2">
            {favorites.map((fav) => (
              <Link
                key={fav.id}
                href={`/notice/${fav.notice.id}`}
                className="flex items-center justify-between rounded-lg border border-border bg-white p-4 hover:shadow-sm transition-all"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {fav.notice.schoolName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {fav.notice.college} · {fav.notice.major}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(fav.notice.applicationEndDate)} 截止
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-white p-8 text-center">
            <p className="text-sm text-muted-foreground">还没有收藏</p>
            <Link href="/" className="text-sm text-primary hover:underline mt-1 inline-block">
              去看看通知
            </Link>
          </div>
        )}
      </section>

      {/* 我的订阅 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          我的订阅
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {subscriptions.length} 个
          </span>
        </h2>

        {subscriptions.length > 0 ? (
          <div className="space-y-2">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-lg border border-border bg-white p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground text-sm">
                    {sub.name || "未命名订阅"}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      sub.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {sub.enabled ? "已开启" : "已关闭"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                  {sub.major && <span>专业: {sub.major}</span>}
                  {sub.schoolLevels && (
                    <span>等级: {JSON.parse(sub.schoolLevels).join("/")}</span>
                  )}
                  {sub.provinces && (
                    <span>省份: {JSON.parse(sub.provinces).join("/")}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-white p-8 text-center">
            <p className="text-sm text-muted-foreground">还没有订阅</p>
            <p className="text-xs text-muted-foreground mt-1">
              在首页设置筛选条件后，可以保存为订阅来接收邮件提醒
            </p>
          </div>
        )}
      </section>

      {/* 退出登录 */}
      <form action={logoutAction}>
        <button
          type="submit"
          className="text-sm text-muted-foreground hover:text-red-600 transition-colors underline"
        >
          退出登录
        </button>
      </form>
    </div>
  )
}
