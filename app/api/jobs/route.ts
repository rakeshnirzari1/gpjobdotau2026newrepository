import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get("q")
    const filter = searchParams.get("filter")
    const practiceId = searchParams.get("practiceId")
    const jobType = searchParams.get("jobType")

    let query = `
      SELECT j.*, p.practice_name, p.logo_url
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.is_paid = true AND j.is_active = true
    `

    const queryParams: any[] = []

    if (q) {
      query += ` AND (
        j.title ILIKE $${queryParams.length + 1} OR
        j.description ILIKE $${queryParams.length + 1} OR
        j.suburb ILIKE $${queryParams.length + 1} OR
        j.state ILIKE $${queryParams.length + 1} OR
        p.practice_name ILIKE $${queryParams.length + 1}
      )`
      queryParams.push(`%${q}%`)
    }

    if (filter === "dpa") {
      query += " AND j.is_dpa = true"
    } else if (filter && filter.startsWith("mmm")) {
      query += ` AND j.mmm_classification = $${queryParams.length + 1}`
      queryParams.push(filter.toUpperCase())
    }

    if (practiceId) {
      query += ` AND j.practice_id = $${queryParams.length + 1}`
      queryParams.push(practiceId)
    }

    if (jobType) {
      query += ` AND j.job_type = $${queryParams.length + 1}`
      queryParams.push(jobType)
    }

    query += " ORDER BY j.created_at DESC"

    const jobs = await sql.unsafe(query, ...queryParams)
    return NextResponse.json({ jobs })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ jobs: [], error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Get the practice ID for the current user
    const practices = await sql`
      SELECT id FROM practices WHERE user_id = ${user.id}
    `

    if (practices.length === 0) {
      return NextResponse.json({ error: "Practice not found" }, { status: 404 })
    }

    const practiceId = practices[0].id

    // Insert the job
    const job = await sql`
      INSERT INTO jobs (
        practice_id, title, description, requirements, benefits,
        suburb, state, postcode, is_dpa, mmm_classification,
        salary_range, job_type, contact_email, contact_phone, application_url
      ) VALUES (
        ${practiceId}, ${body.title}, ${body.description}, ${body.requirements}, ${body.benefits},
        ${body.suburb}, ${body.state}, ${body.postcode}, ${body.is_dpa}, ${body.mmm_classification},
        ${body.salary_range}, ${body.job_type}, ${body.contact_email}, ${body.contact_phone}, ${body.application_url}
      )
      RETURNING *
    `

    return NextResponse.json({ job: job[0] })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
