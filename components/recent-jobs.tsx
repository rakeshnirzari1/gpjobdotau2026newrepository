import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign } from "lucide-react"
import { sql } from "@/lib/db"
import { formatDistance } from "date-fns"
import { slugify } from "@/lib/utils"

async function getRecentJobs() {
  try {
    const jobs = await sql`
      SELECT j.*, p.practice_name, p.logo_url
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.is_active = true
      ORDER BY j.created_at DESC
      LIMIT 8
    `
    return jobs
  } catch (error) {
    console.error("Error fetching recent jobs:", error)
    return []
  }
}

export async function RecentJobs() {
  const jobs = await getRecentJobs()

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Recent GP Opportunities</h2>
        <Link href="/jobs/search" className="text-emerald-600 hover:text-emerald-700 font-medium">
          View all jobs →
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No job listings available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job: any) => {
            const jobSlug = `${slugify(job.title)}-${job.id}`

            return (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <div className="flex items-center mt-2">
                        {job.logo_url && (
                          <div className="relative h-8 w-8 rounded-md overflow-hidden border border-gray-200 mr-2 flex-shrink-0">
                            <Image
                              src={job.logo_url || "/placeholder.svg"}
                              alt={`${job.practice_name} logo`}
                              fill
                              className="object-contain"
                              sizes="32px"
                            />
                          </div>
                        )}
                        <p className="text-gray-600 font-medium">{job.practice_name}</p>
                      </div>
                    </div>
                    <div className="ml-2">
                      <Badge
                        variant={job.is_dpa ? "default" : "outline"}
                        className={job.is_dpa ? "bg-emerald-600" : ""}
                      >
                        {job.is_dpa ? "DPA" : "Non-DPA"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>
                        {job.suburb}, {job.state}
                      </span>
                    </div>
                    {job.salary_range && (
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{job.salary_range}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/jobs/${jobSlug}`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                    View Details →
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
