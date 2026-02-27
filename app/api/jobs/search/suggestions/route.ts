import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")
    const filter = searchParams.get("filter")

    if (!query || query.length < 2) {
      return NextResponse.json({ jobs: [] })
    }

    let sqlQuery = `
      SELECT j.id, j.title, j.suburb, j.state, p.practice_name
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.is_paid = true AND j.is_active = true AND (
        j.title ILIKE $1 OR
        j.description ILIKE $1 OR
        j.suburb ILIKE $1 OR
        j.state ILIKE $1 OR
        p.practice_name ILIKE $1
      )
    `

    const params = [`%${query}%`]

    if (filter === "dpa") {
      sqlQuery += " AND j.is_dpa = true"
    } else if (filter && filter.startsWith("mmm")) {
      sqlQuery += " AND j.mmm_classification = $2"
      params.push(filter.toUpperCase())
    }

    sqlQuery += " ORDER BY j.created_at DESC LIMIT 10"

    const jobs = await sql.unsafe(sqlQuery, ...params)

    // Process the jobs to add DPA and MMM classification to the title if applicable
    const processedJobs = jobs.map((job: any) => {
      const rawTitle = job.title
      let title = job.title

      if (job.is_dpa) {
        title += " (DPA)"
      }

      if (job.mmm_classification) {
        title += ` (${job.mmm_classification})`
      }

      return {
        ...job,
        title,
        rawTitle,
      }
    })

    return NextResponse.json({ jobs: processedJobs })
  } catch (error) {
    console.error("Error in job suggestions API:", error)
    return NextResponse.json({ jobs: [], error: "Failed to fetch job suggestions" }, { status: 500 })
  }
}
