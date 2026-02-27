import { Button } from "@/components/ui/button"
import { JobApprovalForm } from "@/components/job-approval-form"
import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

async function getJob(id: string) {
  const jobs = await sql`
    SELECT j.*, p.practice_name
    FROM jobs j
    JOIN practices p ON j.practice_id = p.id
    WHERE j.id = ${id}
  `
  return jobs.length > 0 ? jobs[0] : null
}

export default async function ApproveJobPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)

  if (!job) {
    notFound()
  }

  // If job is already paid, redirect to edit page
  if (job.is_paid) {
    return (
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/jobs" className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to jobs
        </Link>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Job Already Approved</h2>
          <p className="mb-6">This job has already been approved and published.</p>
          <Link href={`/admin/jobs/${job.id}/edit`}>
            <Button variant="outline">Edit Job</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/jobs" className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to jobs
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Approve Job</h1>
        <p className="text-gray-600 mt-2">
          Approve and publish job: {job.title} for {job.practice_name}
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <JobApprovalForm job={job} />
      </div>
    </div>
  )
}
