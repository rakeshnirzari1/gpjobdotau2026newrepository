import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { slugify } from "@/lib/utils"

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const id = params.id

    // Check if id is a number or a slug
    let jobId = id

    // If it contains non-numeric characters, it's a slug
    if (!/^\d+$/.test(id)) {
      // Extract the ID from the slug (assuming format is "job-title-123")
      jobId = id.split("-").pop() || ""

      if (!jobId || isNaN(Number.parseInt(jobId))) {
        return NextResponse.json({ error: "Invalid job ID" }, { status: 400 })
      }
    }

    const job = await sql`
      SELECT j.*, p.practice_name, p.logo_url, p.about_practice
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.id = ${Number.parseInt(jobId)}
    `

    if (job.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Add slug to the job
    const jobWithSlug = {
      ...job[0],
      slug: `${slugify(job[0].title)}-${job[0].id}`,
    }

    return NextResponse.json({ job: jobWithSlug })
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = params.id
    const body = await request.json()

    // Check if the user owns the job's practice
    const practices = await sql`
      SELECT p.id FROM practices p
      JOIN jobs j ON j.practice_id = p.id
      WHERE j.id = ${id} AND p.user_id = ${user.id}
    `

    if (practices.length === 0 && user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update the job
    const job = await sql`
      UPDATE jobs
      SET
        title = ${body.title},
        description = ${body.description},
        requirements = ${body.requirements},
        benefits = ${body.benefits},
        suburb = ${body.suburb},
        state = ${body.state},
        postcode = ${body.postcode},
        is_dpa = ${body.is_dpa},
        mmm_classification = ${body.mmm_classification},
        salary_range = ${body.salary_range},
        job_type = ${body.job_type},
        contact_email = ${body.contact_email},
        contact_phone = ${body.contact_phone},
        application_url = ${body.application_url},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json({ job: job[0] })
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = params.id

    // Check if the user owns the job's practice
    const practices = await sql`
      SELECT p.id FROM practices p
      JOIN jobs j ON j.practice_id = p.id
      WHERE j.id = ${id} AND p.user_id = ${user.id}
    `

    if (practices.length === 0 && user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete the job
    await sql`
      DELETE FROM jobs
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
