import { JobForm } from "@/components/job-form"
import { requirePractice } from "@/lib/auth"
import { sql } from "@/lib/db"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

async function getSiteSettings() {
  try {
    const settings = await sql`
      SELECT payment_required, job_price FROM site_settings WHERE id = 1
    `
    return settings.length > 0 ? settings[0] : { payment_required: true, job_price: 5000 }
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return { payment_required: true, job_price: 5000 }
  }
}

export default async function NewJobPage() {
  await requirePractice()
  const settings = await getSiteSettings()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Link>
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-gray-600 mt-2">
          Fill out the form below to create a new job listing. All fields marked with * are required.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <JobForm paymentRequired={settings.payment_required} jobPrice={settings.job_price} />
      </div>
    </div>
  )
}
