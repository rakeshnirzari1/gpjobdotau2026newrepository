"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function VerifyPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get("job_id")
  const paymentId = searchParams.get("payment_id")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Verifying payment status...")

  useEffect(() => {
    if (!jobId || !paymentId) {
      setStatus("error")
      setMessage("Missing job ID or payment ID")
      return
    }

    async function verifyPayment() {
      try {
        const response = await fetch("/api/payments/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobId, sessionId: paymentId }),
        })

        const data = await response.json()

        if (response.ok && data.isPaid) {
          setStatus("success")
          setMessage("Payment verified successfully! Your job is now published.")
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else if (response.ok) {
          setStatus("error")
          setMessage(`Payment not completed. Status: ${data.paymentStatus || "unknown"}`)
        } else {
          setStatus("error")
          setMessage(data.error || "Failed to verify payment")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An error occurred while verifying payment")
        console.error("Payment verification error:", error)
      }
    }

    verifyPayment()
  }, [jobId, paymentId, router])

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 text-center">
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-6">
              <Loader2 className="h-16 w-16 text-emerald-600 animate-spin" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Verifying Payment</h1>
            <p className="text-xl text-gray-600 mb-8">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <CheckCircle className="h-16 w-16 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Payment Verified!</h1>
            <p className="text-xl text-gray-600 mb-8">{message}</p>
            <p className="text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle className="h-16 w-16 text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
            <p className="text-xl text-gray-600 mb-8">{message}</p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline">Return to Dashboard</Button>
              </Link>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  setStatus("loading")
                  setMessage("Retrying payment verification...")
                  window.location.reload()
                }}
              >
                Try Again
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
