import { requirePractice } from "@/lib/auth"
import { sql } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

async function getJob(jobId: string, userId: number) {
  const jobs = await sql`
    SELECT j.*, p.practice_name 
    FROM jobs j
    JOIN practices p ON j.practice_id = p.id
    WHERE j.id = ${jobId} AND p.user_id = ${userId}
  `
  return jobs.length > 0 ? jobs[0] : null
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { job_id?: string }
}) {
  const user = await requirePractice()
  const jobId = searchParams.job_id

  if (!jobId) {
    redirect("/dashboard")
  }

  const job = await getJob(jobId, user.id)

  if (!job) {
    redirect("/dashboard")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your job "{job.title}" has been published and is now visible to candidates.
        </p>
        <div className="space-y-4">
          <p className="text-gray-700">
            Your job listing will be active for 30 days and will also be shared on our Facebook group and page.
          </p>
          <p className="text-gray-700">
            You can edit your job listing anytime from your dashboard during the active period.
          </p>
        </div>
        <div className="mt-8">
          <Link href="/dashboard">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
