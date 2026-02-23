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
        console.log("Fetching jobs from API...")
        const response = await fetch("/api/jobs?limit=12", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        console.log("API response status:", response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API error response:", errorText)
          throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Jobs API response:", data)

        // Ensure we're handling the response correctly
        if (!data.jobs || !Array.isArray(data.jobs)) {
          console.error("Invalid jobs data format:", data)
          setJobs([])
        } else {
          setJobs(data.jobs)
        }
      } catch (err) {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <p className="text-gray-500 mt-2">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-500">No jobs available at the moment.</p>
        <p className="text-gray-500 mt-2">Check back soon for new opportunities!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent GP Jobs</h2>
        <Link href="/all-jobs">
          <Button variant="outline">View All Jobs</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1 line-clamp-2">
                    <Link href={`/jobs/${job.slug}`} className="hover:text-emerald-600">
                      {job.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-2">{job.practice_name}</p>
                </div>
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
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant={job.is_dpa ? "default" : "outline"} className={job.is_dpa ? "bg-emerald-600" : ""}>
                  {job.is_dpa ? "DPA" : "Non-DPA"}
                </Badge>
                {job.mmm_classification && <Badge variant="outline">{job.mmm_classification}</Badge>}
                <Badge variant="secondary">{job.job_type}</Badge>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                <span>
                  {job.suburb}, {job.state}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-2" />
                <span>Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}</span>
              </div>

              <p className="text-gray-700 line-clamp-3">{job.description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={`/jobs/${job.slug}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
