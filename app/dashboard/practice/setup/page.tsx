import { PracticeSetupForm } from "@/components/practice-setup-form"
import { requirePractice } from "@/lib/auth"
import { sql } from "@/lib/db"
import { redirect } from "next/navigation"

async function checkPracticeExists(userId: number) {
  const practices = await sql`
    SELECT id FROM practices WHERE user_id = ${userId}
  `
  return practices.length > 0
}

export default async function PracticeSetup() {
  const user = await requirePractice()

  // Check if practice already exists
  const practiceExists = await checkPracticeExists(user.id)

  // If practice exists, redirect to dashboard
  if (practiceExists) {
    redirect("/dashboard/practice")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Set Up Your Practice</h1>
        <p className="text-gray-600 mt-2">Complete your practice profile to start posting jobs</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <PracticeSetupForm />
      </div>
    </div>
  )
}
