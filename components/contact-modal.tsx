"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Phone } from "lucide-react"

type JobContactInfo = {
  contact_email?: string
  contact_phone?: string
  practice_name: string
}

export function ContactModal({ job }: { job: JobContactInfo }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Contact Practice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {job.practice_name}</DialogTitle>
          <DialogDescription>
            Please use the contact information below to inquire about this position.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {job.contact_email && (
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Email</p>
                <a href={`mailto:${job.contact_email}`} className="text-emerald-600 hover:underline">
                  {job.contact_email}
                </a>
              </div>
            </div>
          )}
          {job.contact_phone && (
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Phone</p>
                <a href={`tel:${job.contact_phone}`} className="text-emerald-600 hover:underline">
                  {job.contact_phone}
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
