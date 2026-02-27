import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, DollarSign, Building, Phone, Mail, Globe, ArrowLeft } from "lucide-react"
import { sql } from "@/lib/db"
import { formatDistance } from "date-fns"
import { notFound } from "next/navigation"
import { ContactModal } from "@/components/contact-modal"

// Helper function to extract job ID from slug
function extractJobId(slug: string): string {
  const idMatch = slug.match(/-(\d+)$/)
  return idMatch ? idMatch[1] : slug
}

async function getJobDetails(slug: string) {
  const jobId = extractJobId(slug)

  try {
    const jobs = await sql`
      SELECT j.*, p.practice_name, p.about_practice, p.website, p.phone, p.id as practice_id, p.logo_url
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.id = ${jobId} AND j.is_paid = true
    `

    if (jobs.length === 0) {
      return null
    }

    return jobs[0]
  } catch (error) {
    console.error("Error fetching job details:", error)
    return null
  }
}

export default async function JobDetails({ params }: { params: { slug: string } }) {
  const job = await getJobDetails(params.slug)

  if (!job) {
    notFound()
  }

  // Parse requirements and benefits from text to array
  const requirements = job.requirements ? job.requirements.split("\n").filter(Boolean) : []
  const benefits = job.benefits ? job.benefits.split("\n").filter(Boolean) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/jobs/search" className="flex items-center text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search results
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div className="flex items-center gap-4">
                {job.logo_url && (
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                    <Image
                      src={job.logo_url || "/placeholder.svg"}
                      alt={`${job.practice_name} logo`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                  <Link
                    href={`/jobs/search?practiceId=${job.practice_id}`}
                    className="text-xl text-gray-600 hover:text-emerald-600 hover:underline"
                  >
                    {job.practice_name}
                  </Link>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/jobs/search?filter=dpa`} className="inline-block">
                  <Badge
                    variant={job.is_dpa ? "default" : "outline"}
                    className={job.is_dpa ? "bg-emerald-600 cursor-pointer" : "cursor-pointer"}
                  >
                    {job.is_dpa ? "DPA" : "Non-DPA"}
                  </Badge>
                </Link>
                {job.mmm_classification && (
                  <Link href={`/jobs/search?filter=${job.mmm_classification.toLowerCase()}`} className="inline-block">
                    <Badge variant="outline" className="cursor-pointer">
                      {job.mmm_classification}
                    </Badge>
                  </Link>
                )}
                <Link href={`/jobs/search?jobType=${encodeURIComponent(job.job_type)}`} className="inline-block">
                  <Badge variant="secondary" className="cursor-pointer">
                    {job.job_type}
                  </Badge>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>
                  {job.suburb}, {job.state} {job.postcode}
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

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About the Practice</h2>
              <p className="text-gray-700">{job.about_practice}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Job Description</h2>
              <p className="text-gray-700 mb-4">{job.description}</p>

              {requirements.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                  <ul className="list-disc pl-5 mb-4 text-gray-700">
                    {requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </>
              )}

              {benefits.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Benefits:</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
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
                <h2 className="text-xl font-semibold">Contact Information</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-500 mr-3" />
                  <Link
                    href={`/jobs/search?practiceId=${job.practice_id}`}
                    className="hover:text-emerald-600 hover:underline"
                  >
                    {job.practice_name}
                  </Link>
                </div>
                {job.contact_phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{job.contact_phone}</span>
                  </div>
                )}
                {job.contact_email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{job.contact_email}</span>
                  </div>
                )}
                {job.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 mr-3" />
                    <a
                      href={job.website.startsWith("http") ? job.website : `https://${job.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline"
                    >
                      {job.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-6">
                {job.application_url ? (
                  <a
                    href={
                      job.application_url.startsWith("http") ? job.application_url : `https://${job.application_url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Apply Now</Button>
                  </a>
                ) : (
                  <ContactModal job={job} />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="h-64 w-full mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Map view is currently unavailable</p>
              </div>
              <p className="text-gray-700">
                {job.suburb}, {job.state} {job.postcode}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = await getJobDetails(params.slug)

  if (!job) {
    return {
      title: "Job Not Found | GPJobs.au",
      description: "The requested job listing could not be found.",
    }
  }

  return {
    title: `${job.title} - ${job.suburb}, ${job.state} | GPJobs.au`,
    description: `${job.title} at ${job.practice_name} in ${job.suburb}, ${job.state}. ${job.is_dpa ? "DPA location" : ""} ${job.mmm_classification ? job.mmm_classification : ""}. Apply now!`,
    openGraph: {
      title: `${job.title} - ${job.suburb}, ${job.state} | GPJobs.au`,
      description: `${job.title} at ${job.practice_name} in ${job.suburb}, ${job.state}. ${job.is_dpa ? "DPA location" : ""} ${job.mmm_classification ? job.mmm_classification : ""}. Apply now!`,
      type: "website",
      url: `https://gpjobs.au/jobs/${params.slug}`,
    },
  }
}
