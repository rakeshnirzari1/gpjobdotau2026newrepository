"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import { formatDistance } from "date-fns"

export function RecentJobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/jobs?limit=12", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API error response:", errorText)
          throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (!data.jobs || !Array.isArray(data.jobs)) {
          setJobs([])
        } else {
          setJobs(data.jobs)
        }
      } catch (err: any) {
        console.error("Error fetching recent jobs:", err)
        setError(`Failed to load recent jobs: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-card border-border overflow-hidden">
            <CardContent className="p-6">
              <div className="h-5 bg-muted rounded-md mb-4 w-3/4 animate-pulse" />
              <div className="h-4 bg-muted rounded-md mb-3 w-1/2 animate-pulse" />
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-muted rounded-full w-14 animate-pulse" />
                <div className="h-6 bg-muted rounded-full w-14 animate-pulse" />
              </div>
              <div className="h-4 bg-muted rounded-md mb-2 animate-pulse" />
              <div className="h-4 bg-muted rounded-md mb-4 animate-pulse" />
              <div className="h-16 bg-muted rounded-md animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive font-medium">{error}</p>
        <p className="text-muted-foreground mt-2 text-sm">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No jobs available at the moment.</p>
        <p className="text-muted-foreground mt-1 text-sm">Check back soon for new opportunities!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Recent GP Jobs</h2>
          <p className="text-muted-foreground mt-1 text-sm">Latest opportunities across Australia</p>
        </div>
        <Link href="/all-jobs">
          <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-muted">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="bg-card border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/jobs/${job.slug}`}>
                      {job.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{job.practice_name}</p>
                </div>
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
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
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
                  {job.job_type}
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground mb-2 text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">
                  {job.suburb}, {job.state}
                </span>
              </div>

              <div className="flex items-center text-muted-foreground mb-4 text-sm">
                <Clock className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span>Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{job.description}</p>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Link href={`/jobs/${job.slug}`} className="w-full">
                <Button variant="outline" size="sm" className="w-full border-border text-foreground hover:bg-muted hover:border-primary/20 gap-2">
                  View Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
