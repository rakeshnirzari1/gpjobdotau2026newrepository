import { JobForm } from "@/components/job-form"
import { requirePractice } from "@/lib/auth"
import { sql } from "@/lib/db"
import { notFound } from "next/navigation"

async function getJob(jobId: string, userId: number) {
  const jobs = await sql`
    SELECT j.* FROM jobs j
    JOIN practices p ON j.practice_id = p.id
    WHERE j.id = ${jobId} AND p.user_id = ${userId}
  `
  return jobs.length > 0 ? jobs[0] : null
}

async function getPractice(userId: number) {
  const practices = await sql`
    SELECT * FROM practices WHERE user_id = ${userId}
  `
  return practices.length > 0 ? practices[0] : null
}

export default async function EditJob({ params }: { params: { id: string } }) {
  const user = await requirePractice()
  const job = await getJob(params.id, user.id)

  if (!job) {
    notFound()
  }

  const practice = await getPractice(user.id)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <p className="text-gray-600 mt-2">Update your job listing details</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <JobForm practice={practice} job={job} />
      </div>
    </div>
  )
}
