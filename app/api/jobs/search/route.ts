import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { slugify } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get("q") || ""
    const filter = searchParams.get("filter") || ""
    const jobType = searchParams.get("jobType") || ""
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = 20
    const offset = (page - 1) * limit

    console.log("[SERVER] Search API called with:", { q, filter, jobType, page, limit })

    // Build the query
    let query = `
      SELECT j.*, p.practice_name, p.logo_url
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.is_active = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (q) {
      query += ` AND (
        j.title ILIKE $${paramIndex} OR
        j.description ILIKE $${paramIndex} OR
        j.suburb ILIKE $${paramIndex} OR
        j.state ILIKE $${paramIndex} OR
        p.practice_name ILIKE $${paramIndex}
      )`
      params.push(`%${q}%`)
      paramIndex++
    }

    if (filter === "dpa") {
      query += " AND j.is_dpa = true"
    } else if (filter && filter.startsWith("mmm")) {
      query += ` AND j.mmm_classification = $${paramIndex}`
      params.push(filter.toUpperCase())
      paramIndex++
    }

    if (jobType) {
      query += ` AND (j.job_type = $${paramIndex} OR j.employment_type = $${paramIndex})`
      params.push(jobType)
      paramIndex++
    }

    // Count total jobs for pagination
    const countQuery = `SELECT COUNT(*) FROM (${query}) AS count`
    const countResult = await sql.unsafe(countQuery, ...params)
    const total = Number.parseInt(countResult[0]?.count || "0", 10)

    // Add pagination
    query += ` ORDER BY j.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    console.log("[SERVER] Executing SQL query:", query)
    console.log("[SERVER] With params:", params)

    const jobs = await sql.unsafe(query, ...params)
    console.log(`[SERVER] Found ${jobs?.length || 0} jobs`)

    // Ensure we have an array to work with
    const jobsArray = Array.isArray(jobs) ? jobs : []

    // Add slug to each job
    const jobsWithSlugs = jobsArray.map((job) => {
      const slug = `${slugify(job.title)}-${job.id}`
      return { ...job, slug }
    })

    return NextResponse.json({
      jobs: jobsWithSlugs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[SERVER] Error in search API:", error)
    return NextResponse.json(
      { jobs: [], total: 0, page: 1, limit: 20, totalPages: 0, error: error.message },
      { status: 500 },
    )
  }
}
