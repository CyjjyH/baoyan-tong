"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

const PROVINCES = [
  "全部",
  "北京",
  "上海",
  "天津",
  "重庆",
  "河北",
  "山西",
  "辽宁",
  "吉林",
  "黑龙江",
  "江苏",
  "浙江",
  "安徽",
  "福建",
  "江西",
  "山东",
  "河南",
  "湖北",
  "湖南",
  "广东",
  "海南",
  "四川",
  "贵州",
  "云南",
  "陕西",
  "甘肃",
  "青海",
  "广西",
  "内蒙古",
  "西藏",
  "宁夏",
  "新疆",
]

const SCHOOL_LEVELS = [
  { value: "985", label: "985" },
  { value: "211", label: "211" },
  { value: "DOUBLE_FIRST_CLASS", label: "双一流" },
]

export function SearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const keyword = searchParams.get("keyword") || ""
  const type = searchParams.get("type") || ""
  const province = searchParams.get("province") || ""
  const levels = searchParams.get("levels") || ""

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const toggleLevel = useCallback(
    (level: string) => {
      const current = levels ? levels.split(",") : []
      const next = current.includes(level)
        ? current.filter((l) => l !== level)
        : [...current, level]
      updateParam("levels", next.join(","))
    },
    [levels, updateParam]
  )

  const clearAll = useCallback(() => {
    router.push("/", { scroll: false })
  }, [router])

  const hasFilters = keyword || type || province || levels

  return (
    <div className="space-y-4">
      {/* 关键词搜索 + 类型切换 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="搜索学校、专业或关键词..."
            defaultValue={keyword}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParam("keyword", (e.target as HTMLInputElement).value)
              }
            }}
            onBlur={(e) => updateParam("keyword", e.target.value)}
            className="flex-1 h-10 rounded-md border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
        </div>

        <div className="flex rounded-md border border-border overflow-hidden shrink-0">
          {[
            { value: "", label: "全部" },
            { value: "SUMMER_CAMP", label: "夏令营" },
            { value: "PRE_ADMISSION", label: "预推免" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("type", opt.value)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                type === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-muted-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 学校等级 + 省份 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground shrink-0">
          学校等级:
        </span>
        {SCHOOL_LEVELS.map((lv) => {
          const active = levels.includes(lv.value)
          return (
            <button
              key={lv.value}
              onClick={() => toggleLevel(lv.value)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {lv.label}
            </button>
          )
        })}

        <span className="w-2" />

        <span className="text-xs text-muted-foreground shrink-0">省份:</span>
        <select
          value={province}
          onChange={(e) => updateParam("province", e.target.value)}
          className="h-8 rounded-md border border-border bg-white px-2 text-xs text-foreground outline-none focus:border-primary"
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p === "全部" ? "" : p}>
              {p}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground underline shrink-0"
          >
            清除筛选
          </button>
        )}
      </div>
    </div>
  )
}
