"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { submitNotice } from "@/lib/submit-actions"

const PROVINCES = [
  "北京", "上海", "天津", "重庆", "河北", "山西", "辽宁", "吉林",
  "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南",
  "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西",
  "甘肃", "青海", "广西", "内蒙古", "西藏", "宁夏", "新疆",
]

export default function SubmitPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    const result = await submitNotice(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← 返回首页
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-2">投稿通知</h1>
      <p className="text-sm text-muted-foreground mb-8">
        发现了一个夏令营/预推免通知？填下表投稿，审核通过后所有人可见。带{" "}
        <span className="text-red-500">*</span> 的为必填。
      </p>

      <form
        action={handleSubmit}
        className="rounded-lg border border-border bg-white p-6 space-y-5"
      >
        {/* 学校信息 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="学校名称 *" name="schoolName" placeholder="如：清华大学" />
          <Field label="学院名称 *" name="college" placeholder="如：计算机科学与技术系" />
          <Field label="专业方向 *" name="major" placeholder="如：计算机科学与技术" />
          <Field label="城市 *" name="city" placeholder="如：北京" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              省份 *
            </label>
            <select
              name="province"
              required
              className="w-full h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">选择省份</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              通知类型 *
            </label>
            <select
              name="type"
              required
              className="w-full h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">选择类型</option>
              <option value="SUMMER_CAMP">夏令营</option>
              <option value="PRE_ADMISSION">预推免</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              学校等级 *
            </label>
            <select
              name="schoolLevel"
              required
              className="w-full h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">选择等级</option>
              <option value="985">985</option>
              <option value="211">211</option>
              <option value="DOUBLE_FIRST_CLASS">双一流</option>
              <option value="OTHER">其他</option>
            </select>
          </div>
        </div>

        {/* 时间 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="报名开始日期" name="applicationStartDate" type="date" />
          <Field label="报名截止日期 *" name="applicationEndDate" type="date" />
          <Field label="活动开始日期" name="activityStartDate" type="date" />
          <Field label="活动结束日期" name="activityEndDate" type="date" />
        </div>

        {/* 链接 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="报名链接" name="applicationLink" type="url" placeholder="https://..." />
          <Field label="通知原文链接" name="originalLink" type="url" placeholder="https://..." />
        </div>

        {/* 标题 */}
        <Field label="通知标题 *" name="title" placeholder="如：清华大学计算机系2026年夏令营通知" />

        {/* 文本区 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            申请要求
          </label>
          <textarea
            name="requirements"
            rows={3}
            placeholder="如：专业排名前15%；英语六级480分以上"
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            所需材料
          </label>
          <textarea
            name="materials"
            rows={3}
            placeholder="如：个人陈述、成绩单、两封推荐信"
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "提交中..." : "提交投稿"}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={label.includes("*")}
        placeholder={placeholder}
        className="w-full h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
