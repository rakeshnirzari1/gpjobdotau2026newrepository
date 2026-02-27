import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { requirePractice } from "@/lib/auth"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const user = await requirePractice()
    const { jobId, jobTitle } = await request.json()

    // Validate input
    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    // Check if job exists and belongs to the user
    const jobs = await sql`
      SELECT j.*, p.practice_name 
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.id = ${jobId} AND p.user_id = ${user.id}
    `

    if (jobs.length === 0) {
      return NextResponse.json({ error: "Job not found or you don't have permission" }, { status: 404 })
    }

    const job = jobs[0]

    // Check if job is already paid for
    if (job.is_paid) {
      return NextResponse.json({ error: "This job has already been paid for" }, { status: 400 })
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: `Job Posting: ${jobTitle || job.title}`,
              description: `30-day job listing on GPJobs.au`,
            },
            unit_amount: 15000, // $150.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://gpjobs.au"}/dashboard/jobs/payment-success?job_id=${jobId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://gpjobs.au"}/dashboard/jobs/${jobId}/payment`,
      metadata: {
        jobId: jobId.toString(),
        userId: user.id.toString(),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Create checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
