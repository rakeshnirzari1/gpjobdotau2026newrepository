import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const jobId = params.id
    const jobData = await request.json()

    // Update job
    const updatedJob = await sql`
      UPDATE jobs
      SET 
        practice_id = ${jobData.practice_id},
        title = ${jobData.title},
        description = ${jobData.description},
        requirements = ${jobData.requirements},
        benefits = ${jobData.benefits},
        job_type = ${jobData.job_type},
        salary_range = ${jobData.salary_range},
        is_dpa = ${jobData.is_dpa},
        mmm_classification = ${jobData.mmm_classification},
        contact_email = ${jobData.contact_email},
        contact_phone = ${jobData.contact_phone},
        application_url = ${jobData.application_url},
        suburb = ${jobData.suburb},
        state = ${jobData.state},
        postcode = ${jobData.postcode},
        is_active = ${jobData.is_active},
        is_paid = ${jobData.is_paid},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${jobId}
      RETURNING *
    `

    if (updatedJob.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({
      job: updatedJob[0],
    })
  } catch (error) {
    console.error("Admin update job error:", error)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}
