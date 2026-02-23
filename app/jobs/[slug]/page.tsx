import { notFound } from "next/navigation"
import { sql } from "@/lib/db"
import type { Metadata } from "next"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign, Mail, Phone, Globe, Building } from "lucide-react"
import { formatDistance } from "date-fns"
import { ContactModal } from "@/components/contact-modal"
import { JobMapWrapper } from "@/components/job-map-wrapper"

interface JobPageProps {
  params: {
    slug: string
  }
}

async function getJobById(slug: string) {
  try {
    // Extract the ID from the slug (assuming format is "job-title-123")
    const idMatch = slug.match(/-(\d+)$/)
    const id = idMatch ? Number.parseInt(idMatch[1], 10) : null

    if (!id) {
      return null
    }

    const job = await sql`
      SELECT j.*, p.practice_name, p.logo_url, p.about_practice
      FROM jobs j
      JOIN practices p ON j.practice_id = p.id
      WHERE j.id = ${id} AND j.is_active = true
    `

    return job.length > 0 ? job[0] : null
  } catch (error) {
    console.error("Error fetching job:", error)
    return null
  }
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = await getJobById(params.slug)

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The job listing you're looking for doesn't exist or has been removed.",
    }
  }

  // Create a brief description from the job details
  const briefDescription = job.description.substring(0, 160) + "..."

  // Use the job's full URL
  const jobUrl = `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${params.slug}`

  // Use practice logo if available, otherwise use the site's default OG image
  const imageUrl = job.logo_url || `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`

  return {
    title: `${job.title} at ${job.practice_name} - GP Jobs Australia`,
    description: briefDescription,
    openGraph: {
      title: `${job.title} at ${job.practice_name}`,
      description: briefDescription,
      url: jobUrl,
      siteName: "GP Jobs Australia",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${job.title} at ${job.practice_name}`,
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.practice_name}`,
      description: briefDescription,
      images: [imageUrl],
    },
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const job = await getJobById(params.slug)

  if (!job) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center mb-4">
                  {job.logo_url && (
                    <div className="relative h-10 w-10 rounded-md overflow-hidden border border-gray-200 mr-3">
                      <Image
                        src={job.logo_url || "/placeholder.svg"}
                        alt={`${job.practice_name} logo`}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <span className="text-xl text-gray-700">{job.practice_name}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant={job.is_dpa ? "default" : "outline"} className={job.is_dpa ? "bg-emerald-600" : ""}>
                    {job.is_dpa ? "DPA" : "Non-DPA"}
                  </Badge>
                  {job.mmm_classification && <Badge variant="outline">{job.mmm_classification}</Badge>}
                  <Badge variant="secondary">{job.job_type}</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <ContactModal job={job} />
                {job.application_url && (
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <a href={job.application_url} target="_blank" rel="noopener noreferrer">
                      Apply Online
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                <span>
                  {job.suburb}, {job.state} {job.postcode}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                <span>Posted {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true })}</span>
              </div>
              {job.salary_range && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                  <span>{job.salary_range}</span>
                </div>
              )}
              {job.job_type && (
                <div className="flex items-center text-gray-600">
                  <Building className="h-5 w-5 mr-2 text-emerald-600" />
                  <span>{job.job_type}</span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
              <div className="prose max-w-none">
                {job.description.split("\n").map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {job.requirements && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
                <div className="prose max-w-none">
                  {job.requirements.split("\n").map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {job.benefits && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
                <div className="prose max-w-none">
                  {job.benefits.split("\n").map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {job.contact_email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-emerald-600" />
                    <a href={`mailto:${job.contact_email}`} className="text-emerald-600 hover:underline">
                      {job.contact_email}
                    </a>
                  </div>
                )}
                {job.contact_phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-emerald-600" />
                    <a href={`tel:${job.contact_phone}`} className="text-emerald-600 hover:underline">
                      {job.contact_phone}
                    </a>
                  </div>
                )}
                {job.application_url && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-3 text-emerald-600" />
                    <a
                      href={job.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline"
                    >
                      Apply Online
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="h-64 w-full rounded-md overflow-hidden mb-4">
                <JobMapWrapper job={job} />
              </div>
              <p className="text-gray-600">
                {job.suburb}, {job.state} {job.postcode}
              </p>
            </CardContent>
          </Card>

          {job.about_practice && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {job.practice_name}</h2>
                <div className="prose max-w-none">
                  {job.about_practice.split("\n").map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
