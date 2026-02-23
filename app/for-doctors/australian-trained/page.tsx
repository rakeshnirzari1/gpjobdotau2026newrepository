import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function AustralianTrainedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-doctors" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Doctors
          </Link>
          <h1 className="text-4xl font-bold mb-4">Australian Trained GPs</h1>
          <p className="text-xl text-gray-600">
            Information for doctors who completed their medical training in Australia
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Fellowship Pathways</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>RACGP Fellowship</CardTitle>
                <CardDescription>Royal Australian College of General Practitioners</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The FRACGP is the most common qualification for GPs in Australia. The Australian General Practice
                  Training (AGPT) program is the main pathway to achieving FRACGP, typically taking three years to
                  complete.
                </p>
                <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Completion of hospital-based training (PGY1 and PGY2)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>GP terms in accredited training practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Completion of required assessments and examinations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Meeting ongoing CPD requirements</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <a
                  href="https://www.racgp.org.au/education/registrars/fellowship-pathways"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Visit RACGP Website</Button>
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ACRRM Fellowship</CardTitle>
                <CardDescription>Australian College of Rural and Remote Medicine</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The FACRRM is designed for doctors practicing in rural and remote settings, with a focus on additional
                  procedural and emergency skills. It typically takes four years to complete.
                </p>
                <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Core clinical training (12 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Primary rural and remote training (24 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Advanced specialised training (12 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Completion of required assessments and examinations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <a href="https://www.acrrm.org.au/fellowship" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Visit ACRRM Website</Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Medicare Provider Numbers</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                As an Australian-trained GP, you are eligible to apply for unrestricted Medicare provider numbers once
                you have obtained your fellowship. Before fellowship, you can work under supervision with a provider
                number that has location and time restrictions.
              </p>
              <h3 className="text-lg font-semibold mb-2">Application Process:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Complete the Medicare provider number application form from Services Australia</li>
                <li>Provide evidence of your qualifications and AHPRA registration</li>
                <li>Submit proof of employment or practice arrangements</li>
                <li>For GPs in training, provide evidence of enrollment in an approved training program</li>
              </ol>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.servicesaustralia.gov.au/organisations/health-professionals/services/medicare/medicare-benefits-health-professionals"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Services Australia Website</Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Looking for GP Positions?</h2>
          <p className="mb-6">
            Browse our listings to find GP opportunities across Australia that match your qualifications and career
            goals.
          </p>
          <Link href="/jobs/search">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Search GP Jobs</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
