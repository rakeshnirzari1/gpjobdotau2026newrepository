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

    const { jobId, jobTitle } = await request.json()

    if (!jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 })
    }

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
      return NextResponse.json({ error: "Job is already paid" }, { status: 400 })
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: `Job Posting: ${jobTitle || `Job #${jobId}`}`,
              description: "30-day job listing on GPJob.au",
            },
            unit_amount: 5000, // $50.00 AUD
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/jobs/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/jobs/${jobId}/payment?canceled=true`,
      metadata: {
        jobId: jobId.toString(),
      },
    })

    // Store the session ID with the job for reference
    await sql`
      UPDATE jobs
      SET payment_id = ${session.id}
      WHERE id = ${jobId}
    `

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
