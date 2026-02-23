"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isUpdating, setIsUpdating] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  // Get session_id from URL
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      setIsUpdating(false)
      return
    }

    async function updateJobStatus() {
      try {
        // First, try to get the job ID from the session
        const response = await fetch("/api/payments/update-job-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setIsSuccess(true)
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else {
          console.error("Failed to update job status:", data.error)
        }
      } catch (error) {
        console.error("Error updating job status:", error)
      } finally {
        setIsUpdating(false)
      }
    }

    updateJobStatus()
  }, [sessionId, router])

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 text-center">
        <div className="flex justify-center mb-6">
          {isUpdating ? (
            <Loader2 className="h-16 w-16 text-emerald-600 animate-spin" />
          ) : (
            <div className="bg-emerald-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-emerald-600" />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">
          {isUpdating
            ? "Updating your job status..."
            : isSuccess
              ? "Your job has been published successfully."
              : "Your payment has been processed successfully."}
        </p>
        {!isUpdating && (
          <>
            <p className="text-gray-500 mb-8">
              {isSuccess ? "Redirecting to dashboard..." : "You will be redirected to the dashboard shortly."}
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Return to Dashboard</Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
