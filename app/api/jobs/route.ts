import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { slugify } from "@/lib/utils"

// Helper function to get site settings
async function getSiteSettings() {
  try {
    const settings = await sql`
      SELECT payment_required, job_price FROM site_settings WHERE id = 1
    `
    return settings.length > 0 ? settings[0] : { payment_required: true, job_price: 15000 }
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return { payment_required: true, job_price: 15000 }
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("Jobs API called")
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!, 10) : 10

    console.log("Fetching jobs with limit:", limit)

    // Use a simpler query with direct SQL template literals to avoid potential issues
    const jobs = await sql`
      SELECT j.*, p.practice_name, p.logo_url
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.is_active = true
      ORDER BY j.created_at DESC
      LIMIT ${limit}
    `

    console.log("SQL query executed successfully")
    console.log("Jobs result type:", typeof jobs)
    console.log("Is jobs an array?", Array.isArray(jobs))
    console.log("Jobs result:", jobs)

    // Ensure jobs is an array before using map
    const jobsArray = Array.isArray(jobs) ? jobs : []
    console.log(`Processing ${jobsArray.length} jobs`)

    // Add slug to each job
    const jobsWithSlugs = jobsArray
      .map((job) => {
        if (!job || typeof job !== "object") {
          console.log("Invalid job object:", job)
          return null
        }

        try {
          const slug = `${slugify(job.title || "job")}-${job.id}`
          return { ...job, slug }
        } catch (err) {
          console.error("Error processing job:", err, job)
          return job // Return the original job without slug if there's an error
        }
      })
      .filter(Boolean) // Remove any null entries

    console.log(`Returning ${jobsWithSlugs.length} jobs with slugs`)
    return NextResponse.json({ jobs: jobsWithSlugs })
  } catch (error) {
    console.error("Error in jobs API:", error)
    return NextResponse.json({ jobs: [], error: `Failed to fetch jobs: ${error.message}` }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const settings = await getSiteSettings()

    // Get the practice ID for the current user
    const practices = await sql`
      SELECT id FROM practices WHERE user_id = ${user.id}
    `

    if (practices.length === 0) {
      return NextResponse.json({ error: "Practice not found" }, { status: 404 })
    }

    const practiceId = practices[0].id

    // Set is_paid based on payment settings
    const isPaid = !settings.payment_required

    // Insert the job
    const job = await sql`
      INSERT INTO jobs (
        practice_id, title, description, requirements, benefits,
        suburb, state, postcode, is_dpa, mmm_classification,
        salary_range, job_type, contact_email, contact_phone, application_url,
        is_paid, is_active
      ) VALUES (
        ${practiceId}, ${body.title}, ${body.description}, ${body.requirements}, ${body.benefits},
        ${body.suburb}, ${body.state}, ${body.postcode}, ${body.is_dpa}, ${body.mmm_classification},
        ${body.salary_range}, ${body.job_type}, ${body.contact_email}, ${body.contact_phone}, ${body.application_url},
        ${isPaid}, ${isPaid}
      )
      RETURNING *
    `

    return NextResponse.json({
      job: job[0],
      paymentRequired: settings.payment_required,
    })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
