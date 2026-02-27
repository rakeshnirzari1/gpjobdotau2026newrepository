import { PaymentForm } from "@/components/payment-form"
import { requirePractice } from "@/lib/auth"
import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

async function getJob(jobId: string, userId: number) {
  const jobs = await sql`
    SELECT j.*, p.practice_name 
    FROM jobs j
    JOIN practices p ON j.practice_id = p.id
    WHERE j.id = ${jobId} AND p.user_id = ${userId}
  `
  return jobs.length > 0 ? jobs[0] : null
}

export default async function JobPaymentPage({ params }: { params: { id: string } }) {
  const user = await requirePractice()
  const job = await getJob(params.id, user.id)

  if (!job) {
    notFound()
  }

  // If job is already paid for, redirect to dashboard
  if (job.is_paid) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to dashboard
          </Link>
          <h1 className="text-3xl font-bold">Job Already Published</h1>
          <p className="text-gray-600 mt-2">
            This job has already been paid for and published. You can view and edit it from your dashboard.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{job.title}</h2>
            <p className="mb-6">Your job listing is active and visible to candidates.</p>
            <Link href="/dashboard" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Link>
        <h1 className="text-3xl font-bold">Complete Your Job Posting</h1>
        <p className="text-gray-600 mt-2">
          Your job is ready to be published. Complete the payment to make it visible to candidates.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">{job.title}</h2>
        <PaymentForm jobId={job.id} jobTitle={job.title} />
      </div>
    </div>
  )
}
