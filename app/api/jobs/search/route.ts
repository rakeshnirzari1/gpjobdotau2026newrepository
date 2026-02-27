import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get("q")
    const filter = searchParams.get("filter")
    const practiceId = searchParams.get("practiceId")
    const jobType = searchParams.get("jobType")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let query = `
      SELECT j.*, p.practice_name, p.logo_url
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.is_paid = true AND j.is_active = true
    `

    const queryParams: any[] = []
    let paramIndex = 1

    if (q) {
      query += ` AND (
        j.title ILIKE $${paramIndex} OR
        j.description ILIKE $${paramIndex} OR
        j.suburb ILIKE $${paramIndex} OR
        j.state ILIKE $${paramIndex} OR
        p.practice_name ILIKE $${paramIndex}
      )`
      queryParams.push(`%${q}%`)
      paramIndex++
    }

    if (filter === "dpa") {
      query += " AND j.is_dpa = true"
    } else if (filter && filter.startsWith("mmm")) {
      query += ` AND j.mmm_classification = $${paramIndex}`
      queryParams.push(filter.toUpperCase())
      paramIndex++
    }

    if (practiceId) {
      query += ` AND j.practice_id = $${paramIndex}`
      queryParams.push(practiceId)
      paramIndex++
    }

    if (jobType) {
      query += ` AND j.job_type = $${paramIndex}`
      queryParams.push(jobType)
      paramIndex++
    }

    // Count total jobs
    const countQuery = `SELECT COUNT(*) FROM (${query}) AS count`
    const countResult = await sql.unsafe(countQuery, ...queryParams)
    const total = Number.parseInt(countResult[0].count)

    // Get paginated jobs
    query += ` ORDER BY j.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    queryParams.push(limit, offset)

    const jobs = await sql.unsafe(query, ...queryParams)

    return NextResponse.json({
      jobs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error in job search API:", error)
    return NextResponse.json({ error: "Failed to search jobs" }, { status: 500 })
  }
}
