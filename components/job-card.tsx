"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDistance } from "date-fns"
import { MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { slugify } from "@/lib/utils"

interface JobCardProps {
  job: any
}

export function JobCard({ job }: JobCardProps) {
  const jobSlug = `${slugify(job.title)}-${job.id}`

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex items-center gap-4">
            {job.logo_url && (
              <div className="relative h-12 w-12 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                <Image
                  src={job.logo_url || "/placeholder.svg"}
                  alt={`${job.practice_name} logo`}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">
                <Link href={`/jobs/${jobSlug}`} className="hover:text-emerald-600">
                  {job.title}
                </Link>
              </h3>
              <p className="text-gray-600">{job.practice_name}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={job.is_dpa ? "default" : "outline"} className={job.is_dpa ? "bg-emerald-600" : ""}>
              {job.is_dpa ? "DPA" : "Non-DPA"}
            </Badge>
            {job.mmm_classification && <Badge variant="outline">{job.mmm_classification}</Badge>}
            <Badge variant="secondary">{job.job_type || job.employment_type}</Badge>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>
              {job.suburb}, {job.state}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
