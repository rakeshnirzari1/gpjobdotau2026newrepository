import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const practiceId = params.id
    const { practice_name, address, suburb, state, postcode, phone, website, about_practice, logo_url } =
      await request.json()

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

    if (updatedPractice.length === 0) {
      return NextResponse.json({ error: "Practice not found" }, { status: 404 })
    }

    return NextResponse.json({
      practice: updatedPractice[0],
    })
  } catch (error) {
    console.error("Admin update practice error:", error)
    return NextResponse.json({ error: "Failed to update practice" }, { status: 500 })
  }
}
