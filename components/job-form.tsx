"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface JobFormProps {
  job?: any
  practice?: any
  paymentRequired?: boolean
  jobPrice?: number
}

export function JobForm({ job, practice, paymentRequired = true, jobPrice = 5000 }: JobFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: job?.title || "",
    description: job?.description || "",
    requirements: job?.requirements || "",
    benefits: job?.benefits || "",
    job_type: job?.job_type || "Full-time",
    salary_range: job?.salary_range || "",
    suburb: job?.suburb || "",
    state: job?.state || "NSW",
    postcode: job?.postcode || "",
    is_dpa: job?.is_dpa || false,
    mmm_classification: job?.mmm_classification || "",
    contact_email: job?.contact_email || "",
    contact_phone: job?.contact_phone || "",
    application_url: job?.application_url || "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_dpa: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // If we're editing an existing job
      if (job) {
        const response = await fetch(`/api/jobs/${job.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Failed to update job")
        }

        // After successful update, redirect to dashboard
        router.push("/dashboard")
        router.refresh()
        return
      }

      // If we're creating a new job
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          practice_id: practice?.id,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save job")
      }

      const data = await response.json()

      if (data.paymentRequired) {
        // Redirect to payment page if payment is required
        router.push(`/dashboard/jobs/${data.job.id}/payment`)
      } else {
        // If payment is not required, redirect to dashboard
        router.push("/dashboard")
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Job Details</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. General Practitioner"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe the role, responsibilities, and what makes this position unique"
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Qualifications, experience, and skills required"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits</Label>
          <Textarea
            id="benefits"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="What benefits do you offer? (e.g. flexible hours, CPD allowance)"
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="job_type">Job Type *</Label>
            <Select
              name="job_type"
              value={formData.job_type}
              onValueChange={(value) => handleSelectChange("job_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Locum">Locum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary_range">Salary Range</Label>
            <Input
              id="salary_range"
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              placeholder="e.g. $250,000 - $350,000 per annum"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="suburb">Suburb *</Label>
            <Input
              id="suburb"
              name="suburb"
              value={formData.suburb}
              onChange={handleChange}
              required
              placeholder="e.g. Bondi"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Select name="state" value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NSW">New South Wales</SelectItem>
                <SelectItem value="VIC">Victoria</SelectItem>
                <SelectItem value="QLD">Queensland</SelectItem>
                <SelectItem value="WA">Western Australia</SelectItem>
                <SelectItem value="SA">South Australia</SelectItem>
                <SelectItem value="TAS">Tasmania</SelectItem>
                <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                <SelectItem value="NT">Northern Territory</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postcode">Postcode *</Label>
          <Input
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
            placeholder="e.g. 2026"
            maxLength={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Classification</h2>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is_dpa" className="block mb-1">
              Is this a Distribution Priority Area (DPA)?
            </Label>
            <p className="text-sm text-gray-500">
              DPA status allows practices to recruit doctors with provider number restrictions
            </p>
          </div>
          <Switch id="is_dpa" checked={formData.is_dpa} onCheckedChange={handleSwitchChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mmm_classification">Modified Monash Model (MMM) Classification</Label>
          <Select
            name="mmm_classification"
            value={formData.mmm_classification}
            onValueChange={(value) => handleSelectChange("mmm_classification", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select MMM classification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NOT_SPECIFIED">Not specified</SelectItem>
              <SelectItem value="MMM1">MMM1 - Metropolitan</SelectItem>
              <SelectItem value="MMM2">MMM2 - Regional Centres</SelectItem>
              <SelectItem value="MMM3">MMM3 - Large Rural Towns</SelectItem>
              <SelectItem value="MMM4">MMM4 - Medium Rural Towns</SelectItem>
              <SelectItem value="MMM5">MMM5 - Small Rural Towns</SelectItem>
              <SelectItem value="MMM6">MMM6 - Remote Communities</SelectItem>
              <SelectItem value="MMM7">MMM7 - Very Remote Communities</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email *</Label>
            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={handleChange}
              required
              placeholder="e.g. recruitment@practice.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_phone">Contact Phone</Label>
            <Input
              id="contact_phone"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="e.g. 02 9123 4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="application_url">Application URL</Label>
          <Input
            id="application_url"
            name="application_url"
            type="url"
            value={formData.application_url}
            onChange={handleChange}
            placeholder="e.g. https://yourpractice.com/careers"
          />
        </div>
      </div>

      {paymentRequired && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            After submitting this job, you will be directed to our secure payment page. The listing fee is{" "}
            {formatCurrency(jobPrice / 100)}.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? "Saving..." : job ? "Update Job" : paymentRequired ? "Continue to Payment" : "Publish Job"}
        </Button>
      </div>
    </form>
  )
}
