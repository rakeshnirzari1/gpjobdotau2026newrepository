import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Info, CheckCircle } from "lucide-react"

export default function ClassificationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-practices" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Practices
          </Link>
          <h1 className="text-4xl font-bold mb-4">DPA & MMM Classifications</h1>
          <p className="text-xl text-gray-600">
            Understanding geographical classifications and their impact on GP recruitment
          </p>
        </div>

        <div className="mb-12">
          <div className="relative h-64 w-full mb-8">
            <Image
              src="/australia-map.jpg"
              alt="Map of Australia showing regional classifications"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <p className="mb-6">
            Geographical classifications play a crucial role in GP recruitment in Australia. They determine where
            International Medical Graduates (IMGs) can work, what incentives are available, and can significantly impact
            your practice's ability to attract and retain doctors.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Distribution Priority Area (DPA)</h2>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What is a DPA?</CardTitle>
              <CardDescription>Understanding Distribution Priority Areas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A Distribution Priority Area (DPA) is a classification that identifies locations in Australia with a
                shortage of medical practitioners. This classification replaced the previous District of Workforce
                Shortage (DWS) system in July 2019.
              </p>
              <h3 className="text-lg font-semibold mb-2">Key Points:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Info className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    DPA status is determined based on the GP-to-population ratio, demographics, and socioeconomic
                    factors
                  </span>
                </li>
                <li className="flex items-start">
                  <Info className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Classifications are reviewed annually</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    All locations in MMM 5-7 are automatically classified as DPA, regardless of GP service levels
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.health.gov.au/health-topics/health-workforce/health-workforce-classifications/distribution-priority-area"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Learn More About DPA</Button>
              </a>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why DPA Status Matters for Your Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                DPA status has significant implications for GP recruitment, particularly for practices looking to hire
                International Medical Graduates.
              </p>
              <h3 className="text-lg font-semibold mb-2">Benefits of DPA Status:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Access to IMGs:</strong> Practices in DPA locations can recruit doctors subject to Section
                    19AB restrictions (10-year moratorium)
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bonded Medical Programs:</strong> Doctors under bonded programs can work in DPA locations
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Workforce Programs:</strong> Access to programs like More Doctors for Rural Australia
                    Program (MDRAP)
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recruitment Advantage:</strong> Broader pool of potential candidates
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Modified Monash Model (MMM)</h2>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What is the MMM?</CardTitle>
              <CardDescription>Understanding the Modified Monash Model</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The Modified Monash Model (MMM) is a geographical classification system that categorizes areas based on
                remoteness and population size. It ranges from MM1 (major cities) to MM7 (very remote communities).
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
                href="https://www.health.gov.au/health-topics/health-workforce/health-workforce-classifications/modified-monash-model"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Learn More About MMM</Button>
              </a>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why MMM Classification Matters for Your Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                MMM classification determines eligibility for various incentives and support programs.
              </p>
              <h3 className="text-lg font-semibold mb-2">Benefits Based on MMM Classification:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Workforce Incentive Program:</strong> Higher payments for more remote locations (MM3-MM7)
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rural Procedural Grants Program:</strong> Available to GPs in MM3-MM7 locations
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rural Bulk Billing Incentives:</strong> Higher incentives for MM5-MM7 locations
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>HELP Debt Reduction:</strong> Doctors working in MM3-MM7 areas may be eligible for HELP debt
                    reduction
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Check Your Practice's Classification</h2>
          <p className="mb-6">
            Use the Health Workforce Locator tool to check your practice's DPA status and MMM classification. This
            information is essential for your recruitment strategy.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.health.gov.au/resources/apps-and-tools/health-workforce-locator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-700">Check Your Classification</Button>
            </a>
            <Link href="/dashboard/jobs/new">
              <Button variant="outline">Post a Job</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
