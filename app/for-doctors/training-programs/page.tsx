import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function TrainingProgramsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-doctors" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Doctors
          </Link>
          <h1 className="text-4xl font-bold mb-4">GP Training Programs</h1>
          <p className="text-xl text-gray-600">
            Overview of available training pathways for becoming a GP in Australia
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Australian General Practice Training (AGPT) Program</h2>
          <Card>
            <CardHeader>
              <CardTitle>AGPT Program</CardTitle>
              <CardDescription>The primary training pathway for Australian medical graduates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The AGPT Program is a fully funded, government-supported program for doctors pursuing fellowship with
                either RACGP or ACRRM.
              </p>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>3-4 years of structured training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Hospital and community-based placements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Regular education sessions and assessments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Supervision by experienced GP educators</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.racgp.org.au/education/registrars/australian-general-practice-training-program"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Learn More About AGPT</Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Programs for International Medical Graduates</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Practice Experience Program (PEP)</CardTitle>
                <CardDescription>
                  Self-directed education program for non-vocationally registered doctors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The PEP is designed for doctors with general practice experience who are working towards RACGP
                  Fellowship.
                </p>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Workplace-based assessments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Online learning modules</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Support from medical educators</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Preparation for RACGP Fellowship exams</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <a
                  href="https://www.racgp.org.au/education/imgs/fellowship-pathways/practice-experience-program"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Learn More About PEP</Button>
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>More Doctors for Rural Australia Program (MDRAP)</CardTitle>
                <CardDescription>Support for non-vocationally registered doctors in rural communities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  MDRAP allows non-vocationally registered doctors to work in rural and remote areas while pursuing
                  fellowship.
                </p>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Access to Medicare provider numbers in rural areas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Support to transition to formal GP training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Supervision requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Professional development opportunities</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <a
                  href="https://www.health.gov.au/initiatives-and-programs/more-doctors-for-rural-australia-program"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Learn More About MDRAP</Button>
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Remote Vocational Training Scheme (RVTS)</CardTitle>
                <CardDescription>GP training for doctors in remote and isolated communities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  RVTS allows doctors to train towards fellowship while continuing to provide essential services in
                  remote communities.
                </p>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Distance education and remote supervision</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Educational workshops and webinars</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Tailored support for remote practice</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Preparation for RACGP or ACRRM Fellowship</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <a href="https://rvts.org.au/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Learn More About RVTS</Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Find Training Opportunities</h2>
          <p className="mb-6">Browse our listings to find GP positions that support your training pathway.</p>
          <Link href="/jobs/search">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Search GP Jobs</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
