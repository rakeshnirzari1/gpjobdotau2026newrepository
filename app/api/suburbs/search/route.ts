import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""

    if (!query || query.length < 2) {
      return NextResponse.json({ suburbs: [] })
    }

    // Try to get suburbs from the database
    try {
      const suburbs = await sql`
        SELECT name, state, postcode
        FROM suburbs
        WHERE name ILIKE ${"%" + query + "%"} OR postcode LIKE ${"%" + query + "%"}
        ORDER BY name
        LIMIT 10
      `

      return NextResponse.json({ suburbs })
    } catch (dbError) {
      console.error("Database error when searching suburbs:", dbError)

      // Fallback to some common suburbs if database query fails
      const fallbackSuburbs = [
        { name: "Sydney", state: "NSW", postcode: "2000" },
        { name: "Melbourne", state: "VIC", postcode: "3000" },
        { name: "Brisbane", state: "QLD", postcode: "4000" },
        { name: "Perth", state: "WA", postcode: "6000" },
        { name: "Adelaide", state: "SA", postcode: "5000" },
      ].filter((suburb) => suburb.name.toLowerCase().includes(query.toLowerCase()) || suburb.postcode.includes(query))

      return NextResponse.json({ suburbs: fallbackSuburbs })
    }
  } catch (error) {
    console.error("Suburb search error:", error)
    return NextResponse.json({ error: "Failed to search suburbs" }, { status: 500 })
  }
}
