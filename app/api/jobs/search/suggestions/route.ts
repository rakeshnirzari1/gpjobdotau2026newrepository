import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { slugify } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const filter = searchParams.get("filter")

    console.log("[SERVER] Job suggestions API called with:", { query, filter })

    if (!query || query.length < 2) {
      console.log("[SERVER] Query too short, returning empty results")
      return NextResponse.json({ jobs: [] })
    }

    // Check if the query is for DPA or MMM classification
    const isDpaQuery = query.toLowerCase() === "dpa"
    const isMMM = /^mmm\d$/i.test(query)

    let jobs = []

    if (isDpaQuery) {
      // Search for DPA jobs
      jobs = await sql`
        SELECT j.id, j.title, j.suburb, j.state, p.practice_name, j.is_dpa, j.mmm_classification
        FROM jobs j
        JOIN practices p ON j.practice_id = p.id
        WHERE j.is_active = true AND j.is_dpa = true
        ORDER BY j.created_at DESC
        LIMIT 10
      `
      console.log(`[SERVER] Found ${jobs?.length || 0} DPA jobs`)
    } else if (isMMM) {
      // Search for MMM classification jobs
      const mmmClass = query.toUpperCase()
      jobs = await sql`
        SELECT j.id, j.title, j.suburb, j.state, p.practice_name, j.is_dpa, j.mmm_classification
        FROM jobs j
        JOIN practices p ON j.practice_id = p.id
        WHERE j.is_active = true AND j.mmm_classification = ${mmmClass}
        ORDER BY j.created_at DESC
        LIMIT 10
      `
      console.log(`[SERVER] Found ${jobs?.length || 0} ${mmmClass} jobs`)
    } else {
      // Regular search
      const searchTerm = `%${query.toLowerCase()}%`
      jobs = await sql`
        SELECT j.id, j.title, j.suburb, j.state, p.practice_name, j.is_dpa, j.mmm_classification
        FROM jobs j
        JOIN practices p ON j.practice_id = p.id
        WHERE j.is_active = true AND (
          LOWER(j.title) LIKE ${searchTerm} OR
          LOWER(j.description) LIKE ${searchTerm} OR
          LOWER(j.suburb) LIKE ${searchTerm} OR
          LOWER(j.state) LIKE ${searchTerm} OR
          LOWER(p.practice_name) LIKE ${searchTerm}
        )
        ORDER BY j.created_at DESC
        LIMIT 10
      `
      console.log(`[SERVER] Found ${jobs?.length || 0} jobs matching "${query}"`)
    }

    // Ensure we have an array to work with
    const jobsArray = Array.isArray(jobs) ? jobs : []

    // Process the jobs to add DPA and MMM classification to the title if applicable
    const processedJobs = jobsArray.map((job) => {
      const rawTitle = job.title
      let title = job.title

      if (job.is_dpa) {
        title += " (DPA)"
      }

      if (job.mmm_classification) {
        title += ` (${job.mmm_classification})`
      }

      // Create a slug for the job
      const slug = `${slugify(job.title)}-${job.id}`

      return {
        ...job,
        title,
        rawTitle,
        slug,
      }
    })

    console.log("[SERVER] Returning processed jobs:", processedJobs)
    return NextResponse.json({ jobs: processedJobs })
  } catch (error) {
    console.error("[SERVER] Error in job suggestions API:", error)
    return NextResponse.json({ jobs: [], error: `Failed to fetch job suggestions: ${error.message}` }, { status: 500 })
  }
}
