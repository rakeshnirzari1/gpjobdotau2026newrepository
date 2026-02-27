import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sql } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, Edit, CheckCircle, AlertCircle } from "lucide-react"
import { formatDistance } from "date-fns"

async function getJobs(filter?: string) {
  let query = sql`
    SELECT j.*, p.practice_name, p.logo_url
    FROM jobs j
    JOIN practices p ON j.practice_id = p.id
  `

  if (filter === "active") {
    query = sql`${query} WHERE j.is_active = true AND j.is_paid = true`
  } else if (filter === "pending") {
    query = sql`${query} WHERE j.is_paid = false`
  } else if (filter === "inactive") {
    query = sql`${query} WHERE j.is_active = false AND j.is_paid = true`
  }

  query = sql`${query} ORDER BY j.created_at DESC`

  return await query
}

export default async function AdminJobs({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const filter = searchParams.filter
  const jobs = await getJobs(filter)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <div className="flex gap-2">
          <Link href="/admin/jobs">
            <Button variant={!filter ? "default" : "outline"} className={!filter ? "bg-emerald-600" : ""}>
              All Jobs
            </Button>
          </Link>
          <Link href="/admin/jobs?filter=active">
            <Button
              variant={filter === "active" ? "default" : "outline"}
              className={filter === "active" ? "bg-emerald-600" : ""}
            >
              Active
            </Button>
          </Link>
          <Link href="/admin/jobs?filter=pending">
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              className={filter === "pending" ? "bg-emerald-600" : ""}
            >
              Pending
            </Button>
          </Link>
          <Link href="/admin/jobs?filter=inactive">
            <Button
              variant={filter === "inactive" ? "default" : "outline"}
              className={filter === "inactive" ? "bg-emerald-600" : ""}
            >
              Inactive
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job: any) => (
          <Card key={job.id} className="hover:shadow-sm transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex items-center gap-4">
                  {job.logo_url ? (
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={job.logo_url || "/placeholder.svg"}
                        alt={`${job.practice_name} logo`}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No logo</span>
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <p className="text-gray-600">{job.practice_name}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={job.is_dpa ? "default" : "outline"} className={job.is_dpa ? "bg-emerald-600" : ""}>
                    {job.is_dpa ? "DPA" : "Non-DPA"}
                  </Badge>
                  {job.mmm_classification && <Badge variant="outline">{job.mmm_classification}</Badge>}
                  <Badge variant="secondary">{job.job_type}</Badge>
                  <Badge
                    variant={job.is_active ? "default" : "outline"}
                    className={job.is_active ? "bg-green-600" : ""}
                  >
                    {job.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant={job.is_paid ? "default" : "destructive"} className={job.is_paid ? "bg-blue-600" : ""}>
                    {job.is_paid ? "Paid" : "Unpaid"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {job.suburb}, {job.state} {job.postcode}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}</span>
                </div>
              </div>
              <p className="text-gray-700">{job.description.substring(0, 150)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Link href={`/jobs/${job.id}`} target="_blank">
                  <Button variant="outline">View Public Listing</Button>
                </Link>
              </div>
              <div className="flex gap-2">
                {!job.is_paid && (
                  <Link href={`/admin/jobs/${job.id}/approve`}>
                    <Button variant="default" className="flex items-center bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="h-4 w-4 mr-1" /> Approve & Publish
                    </Button>
                  </Link>
                )}
                <Link href={`/admin/jobs/${job.id}/edit`}>
                  <Button variant="outline" className="flex items-center">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-gray-500">No jobs match the current filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
