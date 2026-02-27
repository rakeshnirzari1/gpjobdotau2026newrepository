import { AdminJobForm } from "@/components/admin-job-form"
import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

async function getJob(id: string) {
  const jobs = await sql`
    SELECT j.*, p.practice_name, p.id as practice_id
    FROM jobs j
    JOIN practices p ON j.practice_id = p.id
    WHERE j.id = ${id}
  `
  return jobs.length > 0 ? jobs[0] : null
}

async function getPractices() {
  const practices = await sql`
    SELECT id, practice_name
    FROM practices
    ORDER BY practice_name
  `
  return practices
}

export default async function AdminEditJob({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)
  const practices = await getPractices()

  if (!job) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/jobs" className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to jobs
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <p className="text-gray-600 mt-2">
          Editing {job.title} for {job.practice_name}
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <AdminJobForm job={job} practices={practices} />
      </div>
    </div>
  )
}
