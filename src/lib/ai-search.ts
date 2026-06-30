"use server"

import { db } from "@/lib/db"

const DEEPSEEK_API = "https://api.deepseek.com/v1/chat/completions"
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY!

interface ExtractedNotice {
  title: string
  schoolName: string
  college: string
  major: string
  type: "SUMMER_CAMP" | "PRE_ADMISSION"
  schoolLevel: string
  province: string
  city: string
  applicationStartDate: string | null
  applicationEndDate: string
  activityStartDate: string | null
  activityEndDate: string | null
  applicationLink: string
  originalLink: string
  requirements: string
  materials: string
}

/**
 * 调用 DeepSeek 从搜索文本中提取结构化通知信息
 */
export async function extractNoticesFromSearch(
  searchResultsText: string
): Promise<ExtractedNotice[]> {
  const prompt = `请从以下夏令营/预推免搜索结果中，提取所有通知的结构化信息。
返回纯 JSON 数组，每个元素代表一条通知，字段如下：

{
  "title": "通知标题",
  "schoolName": "学校全称",
  "college": "学院名称",
  "major": "专业方向",
  "type": "SUMMER_CAMP 或 PRE_ADMISSION",
  "schoolLevel": "985 或 211 或 DOUBLE_FIRST_CLASS 或 OTHER",
  "province": "省份",
  "city": "城市",
  "applicationStartDate": "YYYY-MM-DD（如果没写开始日期，填报名截止日期前30天的日期）",
  "applicationEndDate": "YYYY-MM-DD（报名截止日期，必填）",
  "activityStartDate": "YYYY-MM-DD 或 null",
  "activityEndDate": "YYYY-MM-DD 或 null",
  "applicationLink": "报名网址（完整URL）",
  "originalLink": "通知原文链接（完整URL）",
  "requirements": "申请要求摘要（多条用换行分隔）",
  "materials": "所需材料摘要（多条用换行分隔）"
}

规则：
1. 只提取有明确学校名称和报名截止日期的通知
2. 日期统一转为 YYYY-MM-DD 格式
3. schoolLevel 根据学校判断：清北复交浙南科武中厦等为985，上财西电等为211
4. province/city 根据学校所在地填写
5. 如果搜索结果里没有某字段，填 null
6. 只返回 JSON 数组，不要其他文字

以下是搜索结果：
${searchResultsText}`

  const res = await fetch(DEEPSEEK_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 8000,
      temperature: 0.1,
      response_format: { type: "json_object" },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`DeepSeek API error: ${res.status} ${err}`)
  }

  const data = await res.json()
  const content = data.choices[0].message.content

  // 解析 JSON
  const parsed = JSON.parse(content)
  const notices = Array.isArray(parsed) ? parsed : parsed.notices || []

  return notices as ExtractedNotice[]
}

/**
 * 将提取的通知写入数据库（去重 + 待审核）
 */
export async function ingestNotices(notices: ExtractedNotice[]) {
  let newCount = 0
  let dupCount = 0

  for (const n of notices) {
    // 跳过没有报名截止日期的通知
    if (!n.applicationEndDate) {
      continue
    }

    // 去重：同学校+同学院+同类型+同年视为重复
    const existing = await db.notice.findFirst({
      where: {
        schoolName: n.schoolName,
        college: n.college,
        type: n.type,
        applicationEndDate: {
          gte: new Date(n.applicationEndDate),
        },
      },
    })

    if (existing) {
      dupCount++
      continue
    }

    await db.notice.create({
      data: {
        title: n.title,
        schoolName: n.schoolName,
        college: n.college,
        major: n.major,
        type: n.type,
        schoolLevel: n.schoolLevel,
        province: n.province,
        city: n.city,
        applicationStartDate: n.applicationStartDate
          ? new Date(n.applicationStartDate)
          : new Date(
              new Date(n.applicationEndDate).getTime() - 30 * 86400000
            ),
        applicationEndDate: new Date(n.applicationEndDate),
        activityStartDate: n.activityStartDate
          ? new Date(n.activityStartDate)
          : null,
        activityEndDate: n.activityEndDate
          ? new Date(n.activityEndDate)
          : null,
        applicationLink: n.applicationLink || null,
        originalLink: n.originalLink || null,
        requirements: n.requirements || null,
        materials: n.materials || null,
        source: "AI",
        status: "PUBLISHED",
      },
    })
    newCount++
  }

  // 记录 AI 搜索日志
  await db.aiSearchLog.create({
    data: {
      searchQuery: "自动搜索",
      resultsCount: notices.length,
      newNotices: newCount,
      duplicates: dupCount,
      status: "COMPLETED",
      completedAt: new Date(),
    },
  })

  return { newCount, dupCount }
}
