import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Edit, Plus, CreditCard } from "lucide-react"
import { sql } from "@/lib/db"
import { requirePractice } from "@/lib/auth"
import { formatDistance } from "date-fns"
import { DeleteJobButton } from "@/components/delete-job-button"
import { slugify } from "@/lib/utils"

async function getMyJobs(userId: number) {
  const jobs = await sql`
    SELECT j.*, p.practice_name
    FROM jobs j
    JOIN practices p ON j.practice_id = p.id
    WHERE p.user_id = ${userId}
    ORDER BY j.created_at DESC
  `
  return jobs
}

export default async function Dashboard() {
  const user = await requirePractice()
  const jobs = await getMyJobs(user.id)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Job Listings</h1>
        <Link href="/dashboard/jobs/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <div className="py-12">
              <h2 className="text-2xl font-semibold mb-2">No Job Listings Yet</h2>
              <p className="text-gray-600 mb-6">Post your first job to start attracting qualified GPs.</p>
              <Link href="/dashboard/jobs/new">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="mr-2 h-4 w-4" /> Post Your First Job
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job: any) => {
            const jobSlug = `${slugify(job.title)}-${job.id}`

            return (
              <Card key={job.id} className="hover:shadow-sm transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <p className="text-gray-600 font-medium">{job.practice_name}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/jobs/search?filter=dpa`} className="inline-block">
                        <Badge
                          variant={job.is_dpa ? "default" : "outline"}
                          className={job.is_dpa ? "bg-emerald-600 cursor-pointer" : "cursor-pointer"}
                        >
                          {job.is_dpa ? "DPA" : "Non-DPA"}
                        </Badge>
                      </Link>
                      {job.mmm_classification && (
                        <Link
                          href={`/jobs/search?filter=${job.mmm_classification.toLowerCase()}`}
                          className="inline-block"
                        >
                          <Badge variant="outline" className="cursor-pointer">
                            {job.mmm_classification}
                          </Badge>
                        </Link>
                      )}
                      <Badge variant={job.is_active ? "secondary" : "outline"}>
                        {job.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge
                        variant={job.is_paid ? "success" : "destructive"}
                        className={job.is_paid ? "bg-green-600" : "bg-red-600"}
                      >
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
                  <div>
                    {job.is_paid ? (
                      <Link href={`/jobs/${jobSlug}`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                        View Public Listing
                      </Link>
                    ) : (
                      <div className="text-amber-600">Not yet published - payment required</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!job.is_paid && (
                      <Link href={`/dashboard/jobs/${job.id}/payment`}>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex items-center bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CreditCard className="h-4 w-4 mr-1" /> Pay & Publish
                        </Button>
                      </Link>
                    )}
                    <Link href={`/dashboard/jobs/${job.id}/edit`}>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </Link>
                    <DeleteJobButton jobId={job.id} />
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
