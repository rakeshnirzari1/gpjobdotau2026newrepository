import { type NextRequest, NextResponse } from "next/server"
import { sql, formatJobData } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id

    const jobs = await sql`
      SELECT j.*, p.practice_name, p.about_practice, p.website
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.id = ${jobId}
    `

    if (jobs.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    const job = jobs[0]

    return NextResponse.json({
      job: {
        ...formatJobData(job),
        practice_name: job.practice_name,
        about_practice: job.about_practice,
        practice_website: job.website,
      },
    })
  } catch (error) {
    console.error("Get job error:", error)
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobId = params.id
    const jobData = await request.json()

    // Check if job belongs to user's practice
    const jobs = await sql`
      SELECT j.* FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.id = ${jobId} AND p.user_id = ${user.id}
    `

    if (jobs.length === 0) {
      return NextResponse.json({ error: "Job not found or you do not have permission" }, { status: 404 })
    }

    // Update job
    const updatedJob = await sql`
      UPDATE jobs
      SET 
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
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${jobId}
      RETURNING *
    `

    return NextResponse.json({
      job: formatJobData(updatedJob[0]),
    })
  } catch (error) {
    console.error("Update job error:", error)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobId = params.id

    // Check if job belongs to user's practice
    const jobs = await sql`
      SELECT j.* FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.id = ${jobId} AND p.user_id = ${user.id}
    `

    if (jobs.length === 0) {
      return NextResponse.json({ error: "Job not found or you do not have permission" }, { status: 404 })
    }

    // Delete job
    await sql`
      DELETE FROM jobs
      WHERE id = ${jobId}
    `

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Delete job error:", error)
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
