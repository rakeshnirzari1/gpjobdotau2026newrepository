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

    try {
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
    <div className="bg-background">
      {/* Page header */}
      <div className="bg-hero-bg">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-hero-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-hero-foreground/70 leading-relaxed">
              Have questions about GP recruitment or using our platform? Get in touch with our team.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center hover:shadow-md hover:border-primary/20 transition-all duration-200">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">admin@gpvacancy.com.au</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center hover:shadow-md hover:border-primary/20 transition-all duration-200">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">Phone</h3>
              <p className="text-sm text-muted-foreground">Coming Soon</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center hover:shadow-md hover:border-primary/20 transition-all duration-200">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">Office</h3>
              <p className="text-sm text-muted-foreground">Sydney, NSW, Australia</p>
            </div>
          </div>

          <div className="bg-card p-8 md:p-10 rounded-xl border border-border">
            <h2 className="text-2xl font-serif font-bold text-card-foreground mb-6">Send Us a Message</h2>

            {submitted ? (
              <Alert className="bg-secondary text-secondary-foreground border-primary/20">
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
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-background border-border text-foreground" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-background border-border text-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone (optional)</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-background border-border text-foreground" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType" className="text-foreground">I am a</Label>
                    <Select value={formData.userType} onValueChange={(value) => handleSelectChange("userType", value)}>
                      <SelectTrigger className="bg-background border-border text-foreground">
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
                  <Label htmlFor="subject" className="text-foreground">Subject</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="bg-background border-border text-foreground" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
