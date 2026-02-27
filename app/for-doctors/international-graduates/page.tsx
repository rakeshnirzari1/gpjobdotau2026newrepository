import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function InternationalGraduatesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-doctors" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Doctors
          </Link>
          <h1 className="text-4xl font-bold mb-4">International Medical Graduates</h1>
          <p className="text-xl text-gray-600">
            Guidance for overseas trained doctors seeking to practice as GPs in Australia
          </p>
        </div>

        <Alert className="mb-8 bg-amber-50 text-amber-800 border-amber-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            The pathways and requirements for IMGs can change. Always verify current requirements with AHPRA and the
            relevant medical colleges.
          </AlertDescription>
        </Alert>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AHPRA Registration Pathways</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competent Authority Pathway</CardTitle>
                <CardDescription>For doctors qualified in comparable health systems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This pathway is for IMGs who have completed their training in the UK, Ireland, USA, Canada, or New
                  Zealand.
                </p>
                <h3 className="text-lg font-semibold mb-2">Process:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Apply for provisional registration with AHPRA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Complete 12 months of supervised practice</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Apply for general registration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Pursue fellowship with RACGP or ACRRM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Standard Pathway</CardTitle>
                <CardDescription>For doctors from non-comparable health systems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This pathway requires passing the AMC examinations before applying for registration.
                </p>
                <h3 className="text-lg font-semibold mb-2">Process:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Pass AMC MCQ examination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Pass AMC clinical examination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Apply for provisional registration with AHPRA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Complete 12 months of supervised practice</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Apply for general registration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialist Pathway</CardTitle>
                <CardDescription>For specialists seeking recognition of overseas qualifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This pathway is for specialists who have completed their training overseas and seek recognition of
                  their qualifications in Australia.
                </p>
                <h3 className="text-lg font-semibold mb-2">Process:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Apply for assessment by RACGP or ACRRM</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Complete any additional requirements identified in the assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Apply for specialist registration with AHPRA</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Section 19AB Restrictions (10-Year Moratorium)</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                International Medical Graduates and foreign graduates of Australian medical schools are subject to
                Section 19AB of the Health Insurance Act, commonly known as the "10-year moratorium."
              </p>
              <h3 className="text-lg font-semibold mb-2">Key Points:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Restricts access to Medicare provider numbers for 10 years from initial registration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Requires working in Distribution Priority Areas (DPA) or rural and remote locations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Exemptions may be available in certain circumstances</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.health.gov.au/resources/publications/section-19ab-of-the-health-insurance-act-1973-information-sheet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Learn More About Section 19AB</Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Find DPA Positions</h2>
          <p className="mb-6">
            Browse our listings to find GP opportunities in Distribution Priority Areas across Australia.
          </p>
          <Link href="/jobs/search?q=DPA">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Search DPA Jobs</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
