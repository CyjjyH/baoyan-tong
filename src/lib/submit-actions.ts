"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function submitNotice(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const data = {
    title: formData.get("title") as string,
    schoolName: formData.get("schoolName") as string,
    college: formData.get("college") as string,
    major: formData.get("major") as string,
    type: formData.get("type") as string,
    schoolLevel: formData.get("schoolLevel") as string,
    province: formData.get("province") as string,
    city: formData.get("city") as string,
    applicationStartDate: formData.get("applicationStartDate") as string,
    applicationEndDate: formData.get("applicationEndDate") as string,
    activityStartDate: (formData.get("activityStartDate") as string) || null,
    activityEndDate: (formData.get("activityEndDate") as string) || null,
    applicationLink: (formData.get("applicationLink") as string) || null,
    originalLink: (formData.get("originalLink") as string) || null,
    requirements: (formData.get("requirements") as string) || null,
    materials: (formData.get("materials") as string) || null,
  }

  // 校验必填
  if (
    !data.title ||
    !data.schoolName ||
    !data.college ||
    !data.major ||
    !data.type ||
    !data.schoolLevel ||
    !data.province ||
    !data.city ||
    !data.applicationEndDate
  ) {
    return { error: "请填写所有必填字段（标*的）" }
  }

  await db.submission.create({
    data: {
      ...data,
      applicationStartDate: new Date(
        data.applicationStartDate || data.applicationEndDate
      ),
      applicationEndDate: new Date(data.applicationEndDate),
      activityStartDate: data.activityStartDate
        ? new Date(data.activityStartDate)
        : null,
      activityEndDate: data.activityEndDate
        ? new Date(data.activityEndDate)
        : null,
      submitterId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
  redirect("/dashboard?submitted=1")
}

/**
 * 管理员审核通过投稿 → 转为正式通知
 */
export async function approveSubmission(submissionId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "未登录" }
  }

  const sub = await db.submission.findUnique({ where: { id: submissionId } })
  if (!sub) return { error: "投稿不存在" }

  // 创建正式通知
  await db.notice.create({
    data: {
      title: sub.title,
      schoolName: sub.schoolName,
      college: sub.college,
      major: sub.major,
      type: sub.type,
      schoolLevel: sub.schoolLevel,
      province: sub.province,
      city: sub.city,
      applicationStartDate: sub.applicationStartDate,
      applicationEndDate: sub.applicationEndDate,
      activityStartDate: sub.activityStartDate,
      activityEndDate: sub.activityEndDate,
      applicationLink: sub.applicationLink,
      originalLink: sub.originalLink,
      requirements: sub.requirements,
      materials: sub.materials,
      source: "USER_SUBMISSION",
      status: "PUBLISHED",
      submitterId: sub.submitterId,
    },
  })

  // 更新投稿状态
  await db.submission.update({
    where: { id: submissionId },
    data: {
      status: "APPROVED",
      reviewedBy: session.user.id,
      reviewedAt: new Date(),
    },
  })

  revalidatePath("/admin")
  revalidatePath("/")
}

/**
 * 驳回投稿
 */
export async function rejectSubmission(
  submissionId: string,
  note: string
) {
  await db.submission.update({
    where: { id: submissionId },
    data: {
      status: "REJECTED",
      reviewNote: note,
      reviewedAt: new Date(),
    },
  })

  revalidatePath("/admin")
}
