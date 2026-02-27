import { type NextRequest, NextResponse } from "next/server"
import { sql, formatPracticeData } from "@/lib/db"
import { requirePractice } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await requirePractice()
    const { practice_name, address, suburb, state, postcode, phone, website, about_practice, logo_url } =
      await request.json()

    // Check if practice already exists for this user
    const existingPractice = await sql`
      SELECT id FROM practices WHERE user_id = ${user.id}
    `

    if (existingPractice.length > 0) {
      return NextResponse.json({ error: "You already have a registered practice" }, { status: 409 })
    }

    // Create practice
    const newPractice = await sql`
      INSERT INTO practices (
        user_id, practice_name, address, suburb, state, postcode, 
        phone, website, about_practice, logo_url
      )
      VALUES (
        ${user.id}, ${practice_name}, ${address}, ${suburb}, ${state}, ${postcode}, 
        ${phone}, ${website}, ${about_practice}, ${logo_url}
      )
      RETURNING *
    `

    return NextResponse.json({
      practice: formatPracticeData(newPractice[0]),
    })
  } catch (error) {
    console.error("Create practice error:", error)
    return NextResponse.json({ error: "Failed to create practice" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const practices = await sql`
      SELECT * FROM practices
    `

    return NextResponse.json({
      practices: practices.map(formatPracticeData),
    })
  } catch (error) {
    console.error("Get practices error:", error)
    return NextResponse.json({ error: "Failed to fetch practices" }, { status: 500 })
  }
}
