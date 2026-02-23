import { type NextRequest, NextResponse } from "next/server"
import { sql, formatPracticeData } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const practiceId = params.id

    const practices = await sql`
      SELECT * FROM practices WHERE id = ${practiceId}
    `

    if (practices.length === 0) {
      return NextResponse.json({ error: "Practice not found" }, { status: 404 })
    }

    return NextResponse.json({
      practice: formatPracticeData(practices[0]),
    })
  } catch (error) {
    console.error("Get practice error:", error)
    return NextResponse.json({ error: "Failed to fetch practice" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const practiceId = params.id
    const { practice_name, address, suburb, state, postcode, phone, website, about_practice, logo_url } =
      await request.json()

    // Check if practice belongs to user or user is admin
    const practices = await sql`
      SELECT * FROM practices 
      WHERE id = ${practiceId} AND (user_id = ${user.id} OR ${user.email === "support@gpvacancy.com.au"})
    `

    if (practices.length === 0) {
      return NextResponse.json({ error: "Practice not found or you do not have permission" }, { status: 404 })
    }

    // Update practice
    const updatedPractice = await sql`
      UPDATE practices
      SET 
        practice_name = ${practice_name},
        address = ${address},
        suburb = ${suburb},
        state = ${state},
        postcode = ${postcode},
        phone = ${phone},
        website = ${website},
        about_practice = ${about_practice},
        logo_url = ${logo_url},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${practiceId}
      RETURNING *
    `

    return NextResponse.json({
      practice: formatPracticeData(updatedPractice[0]),
    })
  } catch (error) {
    console.error("Update practice error:", error)
    return NextResponse.json({ error: "Failed to update practice" }, { status: 500 })
  }
}
