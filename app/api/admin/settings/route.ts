import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdmin()

    const settings = await sql`
      SELECT * FROM site_settings 
      WHERE id = 1
    `

    if (settings.length === 0) {
      // Create default settings if they don't exist
      const defaultSettings = await sql`
        INSERT INTO site_settings (id, payment_required, job_price)
        VALUES (1, true, 15000)
        RETURNING *
      `
      return NextResponse.json({ settings: defaultSettings[0] })
    }

    return NextResponse.json({ settings: settings[0] })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()

    // Validate input
    if (typeof body.payment_required !== "boolean") {
      return NextResponse.json({ error: "payment_required must be a boolean" }, { status: 400 })
    }

    if (typeof body.job_price !== "number" || body.job_price < 0) {
      return NextResponse.json({ error: "job_price must be a non-negative number" }, { status: 400 })
    }

    // Check if settings exist
    const existingSettings = await sql`
      SELECT id FROM site_settings WHERE id = 1
    `

    let updatedSettings

    if (existingSettings.length === 0) {
      // Create settings if they don't exist
      updatedSettings = await sql`
        INSERT INTO site_settings (id, payment_required, job_price)
        VALUES (1, ${body.payment_required}, ${body.job_price})
        RETURNING *
      `
    } else {
      // Update existing settings
      updatedSettings = await sql`
        UPDATE site_settings
        SET 
          payment_required = ${body.payment_required},
          job_price = ${body.job_price},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
        RETURNING *
      `
    }

    return NextResponse.json({
      success: true,
      settings: updatedSettings[0],
      message: "Settings updated successfully",
    })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
