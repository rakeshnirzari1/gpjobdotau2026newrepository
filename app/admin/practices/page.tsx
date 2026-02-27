import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { sql } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Building, MapPin, Phone, Globe, Edit } from "lucide-react"

async function getPractices() {
  const practices = await sql`
    SELECT p.*, u.email, u.name as user_name, 
    (SELECT COUNT(*) FROM jobs WHERE practice_id = p.id) as job_count
    FROM practices p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `
  return practices
}

export default async function AdminPractices() {
  const practices = await getPractices()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Practices</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {practices.map((practice: any) => (
          <Card key={practice.id} className="hover:shadow-sm transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex items-center gap-4">
                  {practice.logo_url ? (
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={practice.logo_url || "/placeholder.svg"}
                        alt={`${practice.practice_name} logo`}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-100 border border-gray-200">
                      <Building className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-xl">{practice.practice_name}</CardTitle>
                    <p className="text-gray-600">
                      Owner: {practice.user_name} ({practice.email})
                    </p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {practice.job_count} Jobs
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {practice.address}, {practice.suburb}, {practice.state} {practice.postcode}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{practice.phone}</span>
                </div>
                {practice.website && (
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    <a href={practice.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {practice.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
              <p className="text-gray-700">{practice.about_practice.substring(0, 200)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/admin/practices/${practice.id}/jobs`}>
                <Button variant="outline">View Practice Jobs</Button>
              </Link>
              <Link href={`/admin/practices/${practice.id}/edit`}>
                <Button variant="outline" className="flex items-center">
                  <Edit className="h-4 w-4 mr-1" /> Edit Practice
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
