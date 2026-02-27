import { JobForm } from "@/components/job-form"
import { requirePractice } from "@/lib/auth"
import { sql } from "@/lib/db"
import { redirect } from "next/navigation"

async function getPractice(userId: number) {
  const practices = await sql`
    SELECT * FROM practices WHERE user_id = ${userId}
  `
  return practices.length > 0 ? practices[0] : null
}

export default async function NewJob() {
  const user = await requirePractice()
  const practice = await getPractice(user.id)

  // If practice doesn't exist, redirect to setup
  if (!practice) {
    redirect("/dashboard/practice/setup")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-gray-600 mt-2">Create a job listing to attract qualified GPs to your practice</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <JobForm practice={practice} />
      </div>
    </div>
  )
}
