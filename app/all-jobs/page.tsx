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

  // Get query parameters
  const query = searchParams.get("q") || ""
  const filter = searchParams.get("filter") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true)
      setError(null)

      try {
        console.log("Fetching jobs from API...")

        // Build the API URL with query parameters
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

        console.log("API response status:", response.status)

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const data = await response.json()
        console.log("Jobs API response:", data)

        if (data.error) {
          throw new Error(data.error)
        }

        // Ensure we have an array of jobs
        const jobsArray = Array.isArray(data.jobs) ? data.jobs : []
        console.log("Jobs array:", jobsArray)
        setJobs(jobsArray)

        // Set pagination data
        setPagination({
          currentPage: page,
          totalPages: Math.max(1, Math.ceil((jobsArray.length || 0) / 20)),
          totalJobs: jobsArray.length || 0,
        })
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError(err.message || "Failed to fetch jobs")
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [page, query, filter])

  const handleSearch = (searchTerm) => {
    // Update URL with search term and reset to page 1
    const params = new URLSearchParams()
    if (searchTerm) params.set("q", searchTerm)
    if (filter) params.set("filter", filter)
    params.set("page", "1")

    router.push(`/all-jobs?${params.toString()}`)
  }

  const handlePageChange = (newPage) => {
    // Update URL with new page number
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/all-jobs?${params.toString()}`)
  }

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = []
    const { currentPage, totalPages } = pagination

    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-1"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>,
    )

    // First page
    buttons.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        onClick={() => handlePageChange(1)}
        className="mx-1 hidden sm:inline-flex"
        disabled={currentPage === 1}
      >
        1
      </Button>,
    )

    // Ellipsis if needed
    if (currentPage > 3) {
      buttons.push(
        <span key="ellipsis1" className="mx-1 flex items-center justify-center">
          ...
        </span>,
      )
    }

    // Pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last page as they're handled separately
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="mx-1 hidden sm:inline-flex"
        >
          {i}
        </Button>,
      )
    }

    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="ellipsis2" className="mx-1 flex items-center justify-center">
          ...
        </span>,
      )
    }

    // Last page if there's more than one page
    if (totalPages > 1) {
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          onClick={() => handlePageChange(totalPages)}
          className="mx-1 hidden sm:inline-flex"
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>,
      )
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="ml-1"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>,
    )

    return buttons
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All GP Jobs in Australia</h1>

      <div className="mb-8">
        <SearchForm initialFilter={filter} onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
          <p className="text-lg text-gray-600">Loading jobs...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No jobs found</h2>
          <p className="text-gray-500">
            {query ? `No jobs match your search for "${query}"` : "There are currently no jobs available"}
          </p>
          {query && (
            <Button variant="outline" className="mt-4" onClick={() => router.push("/all-jobs")}>
              View all jobs
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            {query ? (
              <p>
                Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"} matching "{query}"
              </p>
            ) : (
              <p>
                Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">{renderPaginationButtons()}</div>
          )}
        </>
      )}
    </main>
  )
}
