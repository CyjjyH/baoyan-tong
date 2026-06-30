import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  // 先清空旧数据
  await db.notice.deleteMany()

  const notices = [
    {
      title: "2026年清华大学计算机科学与技术系夏令营通知",
      schoolName: "清华大学",
      college: "计算机科学与技术系",
      major: "计算机科学与技术",
      type: "SUMMER_CAMP",
      schoolLevel: "985",
      province: "北京",
      city: "北京",
      applicationStartDate: new Date("2026-04-01"),
      applicationEndDate: new Date("2026-05-15"),
      activityStartDate: new Date("2026-07-10"),
      activityEndDate: new Date("2026-07-15"),
      applicationLink: "https://yz.tsinghua.edu.cn",
      originalLink: "https://yz.tsinghua.edu.cn/xxx/detail",
      requirements: "1. 全国重点高校本科三年级在校生\n2. 专业排名前15%\n3. 英语六级480分以上",
      materials: "1. 个人陈述（1000字以内）\n2. 两封副教授及以上推荐信\n3. 成绩单及排名证明\n4. 英语水平证明",
    },
    {
      title: "北京大学数学科学学院2026年优秀大学生夏令营",
      schoolName: "北京大学",
      college: "数学科学学院",
      major: "数学与应用数学",
      type: "SUMMER_CAMP",
      schoolLevel: "985",
      province: "北京",
      city: "北京",
      applicationStartDate: new Date("2026-03-20"),
      applicationEndDate: new Date("2026-04-30"),
      activityStartDate: new Date("2026-07-03"),
      activityEndDate: new Date("2026-07-07"),
      applicationLink: "https://www.math.pku.edu.cn",
      originalLink: "https://www.math.pku.edu.cn/admission/camp2026",
      requirements: "1. 数学及相关专业本科三年级\n2. GPA不低于3.5/4.0\n3. 有竞赛获奖经历者优先",
      materials: "1. 个人简历\n2. 成绩单\n3. 推荐信两封\n4. 获奖证书复印件",
    },
    {
      title: "复旦大学经济学院2026年预推免选拔通知",
      schoolName: "复旦大学",
      college: "经济学院",
      major: "金融学",
      type: "PRE_ADMISSION",
      schoolLevel: "985",
      province: "上海",
      city: "上海",
      applicationStartDate: new Date("2026-08-01"),
      applicationEndDate: new Date("2026-09-10"),
      activityStartDate: null,
      activityEndDate: null,
      applicationLink: "https://econ.fudan.edu.cn",
      originalLink: "https://econ.fudan.edu.cn/tm2026",
      requirements: "1. 本科三年级在校生\n2. 专业不限，理工科背景优先",
      materials: "1. 申请表\n2. 个人陈述\n3. 成绩单\n4. 英语六级成绩单",
    },
    {
      title: "武汉大学遥感信息工程学院2026年夏令营",
      schoolName: "武汉大学",
      college: "遥感信息工程学院",
      major: "遥感科学与技术",
      type: "SUMMER_CAMP",
      schoolLevel: "985",
      province: "湖北",
      city: "武汉",
      applicationStartDate: new Date("2026-05-01"),
      applicationEndDate: new Date("2026-06-15"),
      activityStartDate: new Date("2026-08-01"),
      activityEndDate: new Date("2026-08-05"),
      applicationLink: "https://rsgis.whu.edu.cn",
      originalLink: "https://rsgis.whu.edu.cn/summercamp2026",
      requirements: "1. 遥感、GIS、计算机等相关专业\n2. 成绩排名前30%",
      materials: "1. 个人简历\n2. 成绩单\n3. 个人陈述",
    },
    {
      title: "上海财经大学会计学院2026年预推免通知",
      schoolName: "上海财经大学",
      college: "会计学院",
      major: "会计学",
      type: "PRE_ADMISSION",
      schoolLevel: "211",
      province: "上海",
      city: "上海",
      applicationStartDate: new Date("2026-08-15"),
      applicationEndDate: new Date("2026-09-20"),
      activityStartDate: null,
      activityEndDate: null,
      applicationLink: "https://accounting.sufe.edu.cn",
      originalLink: "https://accounting.sufe.edu.cn/mt2026",
      requirements: "1. 财会、经管相关专业\n2. GPA 3.0以上",
      materials: "1. 申请表\n2. 成绩单\n3. 推荐信\n4. 英语证明",
    },
    {
      title: "南京大学人工智能学院2026年夏令营报名通知",
      schoolName: "南京大学",
      college: "人工智能学院",
      major: "人工智能",
      type: "SUMMER_CAMP",
      schoolLevel: "985",
      province: "江苏",
      city: "南京",
      applicationStartDate: new Date("2026-04-15"),
      applicationEndDate: new Date("2026-05-31"),
      activityStartDate: new Date("2026-07-15"),
      activityEndDate: new Date("2026-07-20"),
      applicationLink: "https://ai.nju.edu.cn",
      originalLink: "https://ai.nju.edu.cn/camp/2026",
      requirements: "1. 计算机、AI、自动化等相关专业\n2. 专业排名前20%\n3. 有编程项目经验优先",
      materials: "1. 个人陈述\n2. 成绩单及排名证明\n3. 推荐信两封\n4. 项目作品集（可选）",
    },
  ]

  for (const notice of notices) {
    await db.notice.create({ data: notice })
  }

  console.log(`✓ 插入了 ${notices.length} 条示例通知`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
