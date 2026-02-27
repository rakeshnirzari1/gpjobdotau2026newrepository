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
    <Card className="bg-card border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex items-center gap-3">
            {job.logo_url && (
              <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-muted">
                <Image
                  src={job.logo_url || "/placeholder.svg"}
                  alt={`${job.practice_name} logo`}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                <Link href={`/jobs/${jobSlug}`}>
                  {job.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">{job.practice_name}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant={job.is_dpa ? "default" : "outline"}
              className={
                job.is_dpa
                  ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 text-xs"
                  : "border-border text-muted-foreground text-xs"
              }
            >
              {job.is_dpa ? "DPA" : "Non-DPA"}
            </Badge>
            {job.mmm_classification && (
              <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                {job.mmm_classification}
              </Badge>
            )}
            <Badge className="bg-secondary text-secondary-foreground border-0 text-xs">
              {job.job_type || job.employment_type}
            </Badge>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
            <span className="truncate">
              {job.suburb}, {job.state}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
            <span>Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
