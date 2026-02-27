"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchForm } from "@/components/search-form"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

export default function AllJobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
  })

  const query = searchParams.get("q") || ""
  const filter = searchParams.get("filter") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true)
      setError(null)

      try {
        let apiUrl = `/api/jobs?limit=20`
        if (query) apiUrl += `&q=${encodeURIComponent(query)}`
        if (filter) apiUrl += `&filter=${encodeURIComponent(filter)}`
        if (page > 1) apiUrl += `&page=${page}`

        const response = await fetch(apiUrl, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        const jobsArray = Array.isArray(data.jobs) ? data.jobs : []
        setJobs(jobsArray)

        setPagination({
          currentPage: page,
          totalPages: Math.max(1, Math.ceil((jobsArray.length || 0) / 20)),
          totalJobs: jobsArray.length || 0,
        })
      } catch (err: any) {
        console.error("Error fetching jobs:", err)
        setError(err.message || "Failed to fetch jobs")
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [page, query, filter])

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("q", searchTerm)
    if (filter) params.set("filter", filter)
    params.set("page", "1")

    router.push(`/all-jobs?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/all-jobs?${params.toString()}`)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const { currentPage, totalPages } = pagination

    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-border text-foreground hover:bg-muted"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>,
    )

    buttons.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => handlePageChange(1)}
        className={`hidden sm:inline-flex ${currentPage === 1 ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-muted"}`}
        disabled={currentPage === 1}
      >
        1
      </Button>,
    )

    if (currentPage > 3) {
      buttons.push(
        <span key="ellipsis1" className="mx-1 flex items-center justify-center text-muted-foreground">
          ...
        </span>,
      )
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={`hidden sm:inline-flex ${currentPage === i ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-muted"}`}
        >
          {i}
        </Button>,
      )
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="ellipsis2" className="mx-1 flex items-center justify-center text-muted-foreground">
          ...
        </span>,
      )
    }

    if (totalPages > 1) {
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className={`hidden sm:inline-flex ${currentPage === totalPages ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-muted"}`}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>,
      )
    }

    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="border-border text-foreground hover:bg-muted"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>,
    )

    return buttons
  }

  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="bg-hero-bg">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-hero-foreground text-center">
            All GP Jobs in Australia
          </h1>
          <p className="text-hero-foreground/60 text-center mt-2">
            Browse all available positions
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 -mt-8 relative z-20">
          <SearchForm initialFilter={filter} onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/5 border border-destructive/20 text-destructive px-6 py-4 rounded-xl mb-6">
            <strong className="font-semibold">Error: </strong>
            <span>{error}</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">No jobs found</h2>
            <p className="text-muted-foreground text-sm">
              {query ? `No jobs match your search for "${query}"` : "There are currently no jobs available"}
            </p>
            {query && (
              <Button variant="outline" size="sm" className="mt-4 border-border text-foreground hover:bg-muted" onClick={() => router.push("/all-jobs")}>
                View all jobs
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              {query ? (
                <p>
                  Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"} matching &ldquo;{query}&rdquo;
                </p>
              ) : (
                <p>
                  Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">{renderPaginationButtons()}</div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
