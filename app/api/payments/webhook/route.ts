import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature") || ""

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Extract job ID from metadata
  const jobId = session.metadata?.jobId
  if (!jobId) {
    console.error("No job ID found in session metadata")
    return
  }

  try {
    // Update job to mark as paid and active
    await sql`
      UPDATE jobs
      SET is_paid = true, is_active = true, payment_id = ${session.id}, paid_at = NOW()
      WHERE id = ${jobId}
    `

    console.log(`Job ${jobId} marked as paid and active`)
  } catch (error) {
    console.error(`Failed to update job ${jobId}:`, error)
  }
}
