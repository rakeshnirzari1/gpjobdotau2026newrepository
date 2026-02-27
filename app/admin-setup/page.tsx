"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function AdminSetup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleSetup = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/admin/setup")
      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message || "Admin user created successfully")
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setError(data.error || "Failed to create admin user")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Admin Setup</h1>
        <p className="mb-4">Set up the admin user for GPJobs.au</p>
        <p className="mb-6">
          This will create an admin user with the following credentials:
          <br />
          <br />
          <strong>Email:</strong> support@gpvacancy.com.au
          <br />
          <strong>Password:</strong> Nirrax123!@
        </p>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              {success}
              <br />
              Redirecting to login page...
            </AlertDescription>
          </Alert>
        )}

        <Button onClick={handleSetup} disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? "Setting up..." : "Set Up Admin User"}
        </Button>
      </div>
    </div>
  )
}
