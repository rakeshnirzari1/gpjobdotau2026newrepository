"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Phone, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    userType: "doctor",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate form submission
    try {
      // In a real implementation, you would send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        userType: "doctor",
      })
    } catch (err) {
      setError("There was an error submitting your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl mb-12">
          Have questions about GP recruitment or using our platform? Get in touch with our team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Mail className="h-10 w-10 text-emerald-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600">admin@gpvacancy.com.au</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Phone className="h-10 w-10 text-emerald-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">Coming soon)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <MapPin className="h-10 w-10 text-emerald-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Office</h3>
            <p className="text-gray-600">Sydney, NSW, Australia</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          {submitted ? (
            <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
              <AlertDescription>Thank you for your message! Our team will get back to you shortly.</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userType">I am a</Label>
                  <Select value={formData.userType} onValueChange={(value) => handleSelectChange("userType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor / GP</SelectItem>
                      <SelectItem value="practice">Practice Manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
