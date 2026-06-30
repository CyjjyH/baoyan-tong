"use client"

import { useState } from "react"
import { approveSubmission, rejectSubmission } from "@/lib/submit-actions"

export function AdminReview({
  id,
  title,
  requirements,
  materials,
}: {
  id: string
  title: string
  requirements: string | null
  materials: string | null
}) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [note, setNote] = useState("")

  if (done) {
    return <p className="text-sm text-green-600">已处理</p>
  }

  async function handleApprove() {
    setLoading(true)
    await approveSubmission(id)
    setDone(true)
    setLoading(false)
  }

  async function handleReject() {
    if (!note.trim()) return
    setLoading(true)
    await rejectSubmission(id, note)
    setDone(true)
    setLoading(false)
  }

  return (
    <div>
      <div className="bg-muted/50 rounded-md p-3 mb-3">
        <p className="text-xs font-medium text-foreground">{title}</p>
        {requirements && (
          <p className="text-xs text-muted-foreground mt-1">
            要求：{requirements}
          </p>
        )}
        {materials && (
          <p className="text-xs text-muted-foreground">
            材料：{materials}
          </p>
        )}
      </div>

      {!rejectOpen ? (
        <div className="flex gap-2">
          <button
            onClick={handleApprove}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-green-600 text-white h-8 px-3 text-xs font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            通过
          </button>
          <button
            onClick={() => setRejectOpen(true)}
            disabled={loading}
            className="inline-flex items-center rounded-md border border-red-200 bg-white text-red-600 h-8 px-3 text-xs font-medium hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            驳回
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="驳回原因"
            className="flex-1 h-8 rounded-md border border-border px-2 text-xs outline-none focus:border-red-300"
          />
          <button
            onClick={handleReject}
            disabled={loading || !note.trim()}
            className="inline-flex items-center rounded-md bg-red-600 text-white h-8 px-3 text-xs font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            确认驳回
          </button>
        </div>
      )}
    </div>
  )
}
