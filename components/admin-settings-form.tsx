"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface SettingsProps {
  id: number
  payment_required: boolean
  job_price: number
  created_at: Date
  updated_at: Date
}

export function AdminSettingsForm({ settings }: { settings: SettingsProps }) {
  const [formData, setFormData] = useState({
    payment_required: settings.payment_required,
    job_price: settings.job_price / 100, // Convert cents to dollars for display
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, payment_required: checked }))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setFormData((prev) => ({ ...prev, job_price: isNaN(value) ? 0 : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_required: formData.payment_required,
          job_price: Math.round(formData.job_price * 100), // Convert dollars to cents for storage
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update settings")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertDescription>Settings updated successfully!</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="payment_required" className="block mb-1">
            Require Payment for Job Listings
          </Label>
          <p className="text-sm text-gray-500">When turned off, jobs will be automatically published without payment</p>
        </div>
        <Switch id="payment_required" checked={formData.payment_required} onCheckedChange={handleSwitchChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="job_price">Job Listing Price ({formatCurrency(formData.job_price)})</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
          <Input
            id="job_price"
            type="number"
            min="0"
            step="0.01"
            value={formData.job_price}
            onChange={handlePriceChange}
            className="pl-8"
            disabled={!formData.payment_required}
          />
        </div>
        <p className="text-sm text-gray-500">Set the price for posting a job listing (in AUD)</p>
      </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  )
}
