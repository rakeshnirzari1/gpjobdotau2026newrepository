"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { formatDistance } from "date-fns"
import { MapPin, Clock, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchForm } from "@/components/search-form"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get("q") || ""
  const filter = searchParams.get("filter") || ""
  const jobType = searchParams.get("jobType") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Determine the title based on search parameters
  let title = "GP Jobs in Australia"
  if (q) {
    title = `GP Jobs matching "${q}"`
  } else if (filter === "dpa") {
    title = "DPA GP Jobs in Australia"
  } else if (filter && filter.startsWith("mmm")) {
    title = `${filter.toUpperCase()} GP Jobs in Australia`
  } else if (jobType) {
    title = `${jobType} GP Jobs in Australia`
  }

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true)
      setError("")

      try {
        // Build the query string
        const queryParams = new URLSearchParams()
        if (q) queryParams.set("q", q)
        if (filter) queryParams.set("filter", filter)
        if (jobType) queryParams.set("jobType", jobType)
        if (page > 1) queryParams.set("page", page.toString())

        console.log("Fetching jobs with params:", Object.fromEntries(queryParams.entries()))

        const response = await fetch(`/api/jobs/search?${queryParams.toString()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Jobs API response:", data)

        setJobs(data.jobs || [])
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 0)
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [q, filter, jobType, page])

  function handleSearch(query) {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (filter) params.set("filter", filter)
    if (jobType) params.set("jobType", jobType)

    router.push(`/jobs/search?${params.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="mb-8">
        <SearchForm initialQuery={q} onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <span className="ml-2 text-lg">Loading jobs...</span>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {total} {total === 1 ? "Job" : "Jobs"} Found
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  <p className="font-medium">Error: {error}</p>
                  <p className="mt-2">Please try again or contact support if the problem persists.</p>
                </div>
              )}

              {!error && jobs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-500 mb-4">No jobs found matching your search criteria.</p>
                  <p className="text-gray-500">
                    Try adjusting your search terms or{" "}
                    <Link href="/jobs/search" className="text-emerald-600 hover:underline">
                      view all jobs
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
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
                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                <p className="text-gray-600">{job.practice_name}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                variant={job.is_dpa ? "default" : "outline"}
                                className={job.is_dpa ? "bg-emerald-600" : ""}
                              >
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
                              <span>
                                Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    {page > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams)
                          params.set("page", (page - 1).toString())
                          router.push(`/jobs/search?${params.toString()}`)
                        }}
                      >
                        Previous
                      </Button>
                    )}

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show pages around current page
                        let pageNum = i + 1
                        if (totalPages > 5) {
                          if (page > 3) {
                            pageNum = page - 3 + i
                          }
                          if (pageNum > totalPages - 4) {
                            pageNum = totalPages - 4 + i
                          }
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? "default" : "outline"}
                            className={page === pageNum ? "bg-emerald-600" : ""}
                            onClick={() => {
                              const params = new URLSearchParams(searchParams)
                              params.set("page", pageNum.toString())
                              router.push(`/jobs/search?${params.toString()}`)
                            }}
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>

                    {page < totalPages && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams)
                          params.set("page", (page + 1).toString())
                          router.push(`/jobs/search?${params.toString()}`)
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">DPA Status</h3>
                <div className="space-y-2">
                  <Link
                    href={`/jobs/search${q ? `?q=${encodeURIComponent(q)}&filter=dpa` : "?filter=dpa"}`}
                    className={`block p-2 rounded-md ${
                      filter === "dpa" ? "bg-emerald-100 text-emerald-800" : "hover:bg-gray-100"
                    }`}
                  >
                    DPA Locations
                  </Link>
                  <Link
                    href={`/jobs/search${q ? `?q=${encodeURIComponent(q)}` : ""}`}
                    className={`block p-2 rounded-md ${
                      !filter ? "bg-emerald-100 text-emerald-800" : "hover:bg-gray-100"
                    }`}
                  >
                    All Locations
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">MMM Classification</h3>
                <div className="space-y-2">
                  {["mmm1", "mmm2", "mmm3", "mmm4", "mmm5", "mmm6", "mmm7"].map((mmm) => (
                    <Link
                      key={mmm}
                      href={`/jobs/search${q ? `?q=${encodeURIComponent(q)}&filter=${mmm}` : `?filter=${mmm}`}`}
                      className={`block p-2 rounded-md ${
                        filter === mmm ? "bg-emerald-100 text-emerald-800" : "hover:bg-gray-100"
                      }`}
                    >
                      {mmm.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Job Type</h3>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Locum"].map((type) => (
                    <Link
                      key={type}
                      href={`/jobs/search${q ? `?q=${encodeURIComponent(q)}&jobType=${encodeURIComponent(type)}` : `?jobType=${encodeURIComponent(type)}`}`}
                      className={`block p-2 rounded-md ${
                        jobType === type ? "bg-emerald-100 text-emerald-800" : "hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
