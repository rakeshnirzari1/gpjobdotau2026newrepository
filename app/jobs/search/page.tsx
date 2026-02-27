import { sql } from "@/lib/db"
import { SearchForm } from "@/components/search-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatDistance } from "date-fns"
import { slugify } from "@/lib/utils"

interface SearchPageProps {
  searchParams: {
    q?: string
    filter?: string
    practiceId?: string
    jobType?: string
  }
}

async function getJobs(searchParams: SearchPageProps["searchParams"]) {
  const { q, filter, practiceId, jobType } = searchParams

  let query = `
    SELECT j.*, p.practice_name, p.logo_url
    FROM jobs j
    JOIN practices p ON j.practice_id = p.id
    WHERE j.is_paid = true AND j.is_active = true
  `

  const queryParams: any[] = []
  let paramIndex = 1

  if (q) {
    query += ` AND (
      j.title ILIKE $${paramIndex} OR
      j.description ILIKE $${paramIndex} OR
      j.suburb ILIKE $${paramIndex} OR
      j.state ILIKE $${paramIndex} OR
      p.practice_name ILIKE $${paramIndex}
    )`
    queryParams.push(`%${q}%`)
    paramIndex++
  }

  if (filter === "dpa") {
    query += " AND j.is_dpa = true"
  } else if (filter && filter.startsWith("mmm")) {
    query += ` AND j.mmm_classification = $${paramIndex}`
    queryParams.push(filter.toUpperCase())
    paramIndex++
  }

  if (practiceId) {
    query += ` AND j.practice_id = $${paramIndex}`
    queryParams.push(practiceId)
    paramIndex++
  }

  if (jobType) {
    query += ` AND j.job_type = $${paramIndex}`
    queryParams.push(jobType)
    paramIndex++
  }

  query += " ORDER BY j.created_at DESC"

  try {
    const jobs = await sql.unsafe(query, ...queryParams)
    return jobs
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return []
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const jobs = await getJobs(searchParams)
  const { q, filter, practiceId, jobType } = searchParams

  // Determine the title based on search parameters
  let title = "GP Jobs in Australia"
  if (q) {
    title = `GP Jobs matching "${q}"`
  } else if (filter === "dpa") {
    title = "DPA GP Jobs in Australia"
  } else if (filter && filter.startsWith("mmm")) {
    title = `${filter.toUpperCase()} GP Jobs in Australia`
  } else if (practiceId) {
    // If we have a practice ID, get the practice name
    if (jobs.length > 0) {
      title = `GP Jobs at ${jobs[0].practice_name}`
    } else {
      title = "Practice Jobs"
    }
  } else if (jobType) {
    title = `${jobType} GP Jobs in Australia`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="mb-8">
        <SearchForm initialFilter={filter} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Found
          </h2>

          {jobs.length === 0 ? (
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
              {jobs.map((job: any) => {
                const titleForSlug = job.title.replace(/ $$DPA$$$/, "").replace(/ $$MMM\d$$$/, "")

                return (
                  <Link key={job.id} href={`/jobs/${slugify(titleForSlug)}-${job.id}`} className="block">
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
                            <Badge variant="secondary">{job.job_type}</Badge>
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
                )
              })}
            </div>
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

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Job Locations</h2>
            <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Map view is currently unavailable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: { searchParams: SearchPageProps["searchParams"] }) {
  const { q, filter, jobType } = searchParams

  let title = "GP Jobs in Australia | GPJobs.au"
  let description =
    "Find GP job opportunities across Australia. Browse through our listings to find the perfect position."

  if (q) {
    title = `GP Jobs matching "${q}" | GPJobs.au`
    description = `Browse GP job opportunities matching "${q}" across Australia.`
  } else if (filter === "dpa") {
    title = "DPA GP Jobs in Australia | GPJobs.au"
    description = "Find GP job opportunities in District Priority Areas (DPA) across Australia."
  } else if (filter && filter.startsWith("mmm")) {
    title = `${filter.toUpperCase()} GP Jobs in Australia | GPJobs.au`
    description = `Find GP job opportunities in ${filter.toUpperCase()} classified areas across Australia.`
  } else if (jobType) {
    title = `${jobType} GP Jobs in Australia | GPJobs.au`
    description = `Find ${jobType.toLowerCase()} GP job opportunities across Australia.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://gpjobs.au/jobs/search",
    },
  }
}
