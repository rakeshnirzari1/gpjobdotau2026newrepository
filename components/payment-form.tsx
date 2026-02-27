"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface PaymentFormProps {
  jobId: number
  jobTitle: string
}

export function PaymentForm({ jobId, jobTitle }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Create a checkout session
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          jobTitle,
        }),
      })

      const { sessionId, error: checkoutError } = await response.json()

      if (checkoutError) {
        throw new Error(checkoutError)
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Failed to load Stripe")
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message || "Something went wrong with the payment")
      }
    } catch (err: any) {
      setError(err.message || "Failed to process payment")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
        <CheckCircle className="h-4 w-4 text-emerald-600" />
        <AlertDescription>
          Payment successful! Your job has been published. Redirecting to dashboard...
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Job Posting Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Standard Job Posting (30 days)</span>
          <span>$50.00</span>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$50.00 AUD</span>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg"
      >
        {isLoading ? (
          "Processing..."
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" /> Pay $50 and Publish Job
          </>
        )}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Your job will be published immediately after successful payment.
      </p>
    </div>
  )
}
