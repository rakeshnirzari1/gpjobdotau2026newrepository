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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Job = {
  id: number
  practice_id: number
  title: string
  description: string
  requirements: string
  benefits: string
  job_type: string
  salary_range: string
  is_dpa: boolean
  mmm_classification: string
  contact_email: string
  contact_phone: string
  application_url: string
  suburb: string
  state: string
  postcode: string
  is_active: boolean
  is_paid: boolean
  practice_name?: string
}

type Practice = {
  id: number
  practice_name: string
}

export function AdminJobForm({ job, practices }: { job: Job; practices: Practice[] }) {
  const [formData, setFormData] = useState({
    practice_id: job.practice_id,
    title: job.title || "",
    description: job.description || "",
    requirements: job.requirements || "",
    benefits: job.benefits || "",
    job_type: job.job_type || "Full-time",
    salary_range: job.salary_range || "",
    is_dpa: job.is_dpa || false,
    mmm_classification: job.mmm_classification || "",
    contact_email: job.contact_email || "",
    contact_phone: job.contact_phone || "",
    application_url: job.application_url || "",
    suburb: job.suburb || "",
    state: job.state || "NSW",
    postcode: job.postcode || "",
    is_active: job.is_active || false,
    is_paid: job.is_paid || false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update job")
      }

      setSuccess(true)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const jobTypes = ["Full-time", "Part-time", "Locum", "Contract", "Casual"]
  const mmmClassifications = ["MMM1", "MMM2", "MMM3", "MMM4", "MMM5", "MMM6", "MMM7"]
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
          <AlertDescription>Job updated successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="practice_id">Practice</Label>
        <Select
          value={formData.practice_id.toString()}
          onValueChange={(value) => handleSelectChange("practice_id", Number.parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select practice" />
          </SelectTrigger>
          <SelectContent>
            {practices.map((practice) => (
              <SelectItem key={practice.id} value={practice.id.toString()}>
                {practice.practice_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits</Label>
          <Textarea id="benefits" name="benefits" value={formData.benefits} onChange={handleChange} rows={4} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="job_type">Job Type</Label>
          <Select value={formData.job_type} onValueChange={(value) => handleSelectChange("job_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary_range">Salary Range (optional)</Label>
          <Input id="salary_range" name="salary_range" value={formData.salary_range} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is_dpa" className="block mb-1">
              Distribution Priority Area (DPA)
            </Label>
            <p className="text-sm text-gray-500">Is this practice in a DPA?</p>
          </div>
          <Switch
            id="is_dpa"
            checked={formData.is_dpa}
            onCheckedChange={(checked) => handleSwitchChange("is_dpa", checked)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mmm_classification">MMM Classification (optional)</Label>
          <Select
            value={formData.mmm_classification}
            onValueChange={(value) => handleSelectChange("mmm_classification", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select MMM classification" />
            </SelectTrigger>
            <SelectContent>
              {mmmClassifications.map((mmm) => (
                <SelectItem key={mmm} value={mmm}>
                  {mmm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="application_url">Application URL (optional)</Label>
        <Input
          id="application_url"
          name="application_url"
          value={formData.application_url}
          onChange={handleChange}
          placeholder="https://"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="suburb">Suburb</Label>
          <Input id="suburb" name="suburb" value={formData.suburb} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is_active" className="block mb-1">
              Job Status
            </Label>
            <p className="text-sm text-gray-500">Is this job active and visible to candidates?</p>
          </div>
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is_paid" className="block mb-1">
              Payment Status
            </Label>
            <p className="text-sm text-gray-500">Has this job been paid for?</p>
          </div>
          <Switch
            id="is_paid"
            checked={formData.is_paid}
            onCheckedChange={(checked) => handleSwitchChange("is_paid", checked)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Job"}
      </Button>
    </form>
  )
}
