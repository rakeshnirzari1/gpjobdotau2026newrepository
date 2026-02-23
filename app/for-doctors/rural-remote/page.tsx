import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MapPin } from "lucide-react"

export default function RuralRemotePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-doctors" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Doctors
          </Link>
          <h1 className="text-4xl font-bold mb-4">Rural & Remote Practice</h1>
          <p className="text-xl text-gray-600">Information about practicing as a GP in rural and remote Australia</p>
        </div>

        <div className="mb-12">
          <div className="relative h-64 w-full mb-8">
            <Image
              src="/rural-australia.jpg"
              alt="Rural Australian landscape"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <p className="mb-6">
            Rural and remote practice offers unique opportunities and challenges for GPs. From diverse clinical
            experiences to stronger community connections, working outside major cities can be a rewarding career path
            with additional financial incentives and support programs.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Modified Monash Model (MMM)</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                The Modified Monash Model (MMM) is a geographical classification system used to categorize areas based
                on remoteness and population size. It ranges from MM1 (major cities) to MM7 (very remote communities).
              </p>
              <h3 className="text-lg font-semibold mb-2">MMM Categories:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">MM1:</span> Major cities
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">MM2:</span> Regional centers (50,000 - 100,000 people)
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">MM3:</span> Large rural towns (15,000 - 50,000 people)
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">MM4:</span> Medium rural towns (5,000 - 15,000 people)
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">MM5:</span> Small rural towns (fewer than 5,000 people)
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">MM6:</span> Remote communities
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">MM7:</span> Very remote communities
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.health.gov.au/resources/apps-and-tools/health-workforce-locator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Check MMM Classifications</Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Rural Incentive Programs</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workforce Incentive Program (WIP)</CardTitle>
                <CardDescription>Financial incentives for doctors in rural and remote areas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The WIP provides financial incentives to doctors who practice in rural and remote areas, with higher
                  payments for more remote locations (MM3-MM7).
                </p>
                <h3 className="text-lg font-semibold mb-2">Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Annual payments based on location and length of service</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Additional loading for remote areas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Support for practices to employ allied health professionals</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rural Procedural Grants Program (RPGP)</CardTitle>
                <CardDescription>Support for procedural GPs in rural areas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The RPGP provides financial support for rural GPs to maintain their procedural skills in emergency
                  medicine, surgery, anesthetics, and obstetrics.
                </p>
                <h3 className="text-lg font-semibold mb-2">Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Funding for continuing professional development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Support for upskilling in procedural areas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Available to GPs in MM3-MM7 locations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rural Generalist Training Pathway</CardTitle>
                <CardDescription>Specialized training for rural practice</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The Rural Generalist Pathway provides coordinated training for doctors to develop the extended skills
                  needed for rural and remote practice.
                </p>
                <h3 className="text-lg font-semibold mb-2">Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Training in advanced skills such as obstetrics, anesthetics, or emergency medicine</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Structured pathway to ACRRM Fellowship</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Support throughout training and early career</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Find Rural & Remote Opportunities</h2>
          <p className="mb-6">
            Browse our listings to find GP positions in rural and remote areas across Australia, with details on MMM
            classifications and available incentives.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/jobs/search?q=MMM3">
              <Button variant="outline">MMM3 Jobs</Button>
            </Link>
            <Link href="/jobs/search?q=MMM4">
              <Button variant="outline">MMM4 Jobs</Button>
            </Link>
            <Link href="/jobs/search?q=MMM5">
              <Button variant="outline">MMM5 Jobs</Button>
            </Link>
            <Link href="/jobs/search?q=MMM6">
              <Button variant="outline">MMM6 Jobs</Button>
            </Link>
            <Link href="/jobs/search?q=MMM7">
              <Button variant="outline">MMM7 Jobs</Button>
            </Link>
            <Link href="/jobs/search">
              <Button className="bg-emerald-600 hover:bg-emerald-700">All Rural Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
