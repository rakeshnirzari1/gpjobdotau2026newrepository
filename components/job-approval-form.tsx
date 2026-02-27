"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Job = {
  id: number
  title: string
  practice_name: string
}

export function JobApprovalForm({ job }: { job: Job }) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleApprove = async () => {
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(`/api/admin/jobs/${job.id}/approve`, {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to approve job")
      }

      router.push("/admin/jobs")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Job Title</h3>
              <p>{job.title}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Practice</h3>
              <p>{job.practice_name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">Approval Confirmation</h3>
        <p className="text-amber-800 mb-4">
          You are about to approve this job without payment. The job will be marked as paid and published on the
          website.
        </p>
        <p className="text-amber-800 font-medium">Are you sure you want to continue?</p>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleApprove} className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
          {isLoading ? "Approving..." : "Approve & Publish Job"}
        </Button>
      </div>
    </div>
  )
}
