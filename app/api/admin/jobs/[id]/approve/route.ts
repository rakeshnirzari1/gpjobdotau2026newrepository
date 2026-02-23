import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const jobId = params.id

    // Update job to mark it as paid and active
    const updatedJob = await sql`
      UPDATE jobs
      SET 
        is_paid = true,
        is_active = true,
        payment_status = 'completed',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${jobId}
      RETURNING *
    `

    if (updatedJob.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      job: updatedJob[0],
      message: "Job approved and published successfully",
    })
  } catch (error) {
    console.error("Admin approve job error:", error)
    return NextResponse.json({ error: "Failed to approve job", details: String(error) }, { status: 500 })
  }
}
