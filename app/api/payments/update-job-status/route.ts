import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import Stripe from "stripe"
import { requirePractice } from "@/lib/auth"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    // Ensure user is authenticated
    const user = await requirePractice()

    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
    }

    console.log(`Updating job status for session: ${sessionId}`)

    try {
      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId)

      // Get the job ID from the session metadata
      const jobId = session.metadata?.jobId

      if (!jobId) {
        return NextResponse.json({ error: "No job ID found in session metadata" }, { status: 404 })
      }

      console.log(`Found job ID ${jobId} in session metadata`)

      // Verify the job belongs to this user
      const jobs = await sql`
        SELECT j.* FROM jobs j
        JOIN practices p ON j.practice_id = p.id
        WHERE j.id = ${jobId} AND p.user_id = ${user.id}
      `

      if (jobs.length === 0) {
        return NextResponse.json({ error: "Job not found or not authorized" }, { status: 404 })
      }

      // Check if job is already paid
      if (jobs[0].is_paid) {
        return NextResponse.json({ success: true, alreadyPaid: true })
      }

      // If session is paid, update the job
      if (session.payment_status === "paid") {
        await sql`
          UPDATE jobs
          SET is_paid = true, is_active = true, payment_id = ${sessionId}, paid_at = NOW()
          WHERE id = ${jobId}
        `

        return NextResponse.json({ success: true, isPaid: true })
      } else {
        return NextResponse.json({
          success: false,
          isPaid: false,
          paymentStatus: session.payment_status,
          error: `Payment not completed. Status: ${session.payment_status}`,
        })
      }
    } catch (error: any) {
      console.error("Error verifying payment with Stripe:", error)
      return NextResponse.json({ error: `Error verifying payment: ${error.message}` }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: `Payment verification failed: ${error.message}` }, { status: 500 })
  }
}
