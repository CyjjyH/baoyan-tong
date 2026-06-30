export default function HomePage() {
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

        {/* 搜索框 */}
        <div className="mx-auto max-w-xl flex gap-2">
          <input
            type="text"
            placeholder="搜索学校、专业或关键词..."
            className="flex-1 h-10 rounded-md border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:bg-primary/90 transition-colors">
            搜索
          </button>
        </div>
      </section>

      {/* 通知列表占位 */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">最新通知</h2>
          <span className="text-sm text-muted-foreground">暂无数据</span>
        </div>

        {/* 空状态提示 */}
        <div className="rounded-lg border border-dashed border-border bg-white p-12 text-center">
          <p className="text-muted-foreground">还没有通知数据</p>
          <p className="text-sm text-muted-foreground mt-1">
            通知将在后台录入或 AI 自动抓取后显示在这里
          </p>
        </div>
      </section>
    </div>
  )
}
