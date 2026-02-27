import { PracticeProfileForm } from "@/components/practice-profile-form"
import { requirePractice } from "@/lib/auth"
import { sql } from "@/lib/db"
import { redirect } from "next/navigation"

async function getPractice(userId: number) {
  const practices = await sql`
    SELECT * FROM practices WHERE user_id = ${userId}
  `
  return practices.length > 0 ? practices[0] : null
}

export default async function PracticePage() {
  const user = await requirePractice()
  const practice = await getPractice(user.id)

  // If practice doesn't exist, redirect to setup
  if (!practice) {
    redirect("/dashboard/practice/setup")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Practice Profile</h1>
        <p className="text-gray-600 mt-2">Update your practice information</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <PracticeProfileForm practice={practice} />
      </div>
    </div>
  )
}
