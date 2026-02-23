"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogoUpload } from "@/components/logo-upload"

type Practice = {
  id: number
  practice_name: string
  address: string
  suburb: string
  state: string
  postcode: string
  phone: string
  website: string
  about_practice: string
  logo_url?: string | null
}

export function PracticeProfileForm({ practice }: { practice: Practice }) {
  const [formData, setFormData] = useState({
    practice_name: practice.practice_name || "",
    address: practice.address || "",
    suburb: practice.suburb || "",
    state: practice.state || "NSW",
    postcode: practice.postcode || "",
    phone: practice.phone || "",
    website: practice.website || "",
    about_practice: practice.about_practice || "",
    logo_url: practice.logo_url || null,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }))
  }

  const handleLogoChange = (logoUrl: string | null) => {
    setFormData((prev) => ({ ...prev, logo_url: logoUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/practices/${practice.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update practice")
      }

      setSuccess(true)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const states = [
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" },
  ]

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
          <AlertDescription>Practice profile updated successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Practice Logo (optional)</Label>
        <LogoUpload initialLogo={practice.logo_url || undefined} onLogoChange={handleLogoChange} />
        <p className="text-sm text-gray-500">Upload your practice logo to display on job listings</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="practice_name">Practice Name</Label>
        <Input
          id="practice_name"
          name="practice_name"
          value={formData.practice_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="suburb">Suburb</Label>
          <Input id="suburb" name="suburb" value={formData.suburb} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={handleStateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postcode">Postcode</Label>
          <Input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website (optional)</Label>
        <Input id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about_practice">About Your Practice</Label>
        <Textarea
          id="about_practice"
          name="about_practice"
          value={formData.about_practice}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell potential candidates about your practice, team, facilities, and work environment..."
        />
      </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Practice Profile"}
      </Button>
    </form>
  )
}
