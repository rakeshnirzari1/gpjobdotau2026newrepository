import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, FileText, CheckCircle, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegulatoryRequirementsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-practices" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Practices
          </Link>
          <h1 className="text-4xl font-bold mb-4">Regulatory Requirements</h1>
          <p className="text-xl text-gray-600">Navigate the regulatory landscape for GP employment in Australia</p>
        </div>

        <Alert className="mb-8 bg-amber-50 text-amber-800 border-amber-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Regulatory requirements can change. Always verify current requirements with the relevant authorities.
          </AlertDescription>
        </Alert>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AHPRA Registration Requirements</h2>
          <Card>
            <CardHeader>
              <CardTitle>Medical Practitioner Registration</CardTitle>
              <CardDescription>Australian Health Practitioner Regulation Agency requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                All doctors practicing in Australia must be registered with the Medical Board of Australia through
                AHPRA. As a practice employing GPs, you should verify:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registration Type:</strong> General, Specialist, Provisional, Limited, or Student
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Conditions or Undertakings:</strong> Any restrictions on practice
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registration Expiry:</strong> Ensure registration is current
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Specialty Registration:</strong> For GPs, check for specialty registration in general
                    practice
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a href="https://www.ahpra.gov.au/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2">
                  AHPRA Website
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Medicare Provider Numbers</h2>
          <Card>
            <CardHeader>
              <CardTitle>Provider Number Requirements</CardTitle>
              <CardDescription>Understanding Medicare provider number regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                GPs require a Medicare provider number for each location where they practice. Different rules apply
                depending on the doctor's qualifications and visa status:
              </p>
              <h3 className="text-lg font-semibold mb-2">Australian-Trained GPs:</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fellows:</strong> Unrestricted access to provider numbers
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registrars:</strong> Provider numbers linked to approved training posts
                  </span>
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-2">International Medical Graduates:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 19AB (10-year moratorium):</strong> Restricted to working in DPA locations
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 19AA:</strong> Requires vocational recognition or enrollment in approved program
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Exemptions:</strong> Available in certain circumstances (e.g., areas of need)
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.servicesaustralia.gov.au/organisations/health-professionals/services/medicare/medicare-benefits-health-professionals"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="flex items-center gap-2">
                  Services Australia Website
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Supervision Requirements</h2>
          <Card>
            <CardHeader>
              <CardTitle>Supervision for IMGs and Registrars</CardTitle>
              <CardDescription>Understanding supervision obligations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Many doctors require supervision, including IMGs with limited or provisional registration and GP
                registrars. As a practice, you need to understand:
              </p>
              <h3 className="text-lg font-semibold mb-2">Supervision Levels:</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Level 1:</strong> Direct supervision (supervisor physically present)
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Level 2:</strong> Indirect supervision (supervisor on-site)
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Level 3:</strong> Remote supervision (supervisor available by phone/video)
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Level 4:</strong> Oversight (regular reviews)
                  </span>
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-2">Practice Responsibilities:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Ensure appropriate supervisors are available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Maintain supervision logs and documentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Provide regular feedback and assessment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Report concerns to the relevant authorities</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.medicalboard.gov.au/Registration/International-Medical-Graduates/supervision.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="flex items-center gap-2">
                  Medical Board Supervision Guidelines
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Employment Contracts and Agreements</h2>
          <Card>
            <CardHeader>
              <CardTitle>Legal Considerations</CardTitle>
              <CardDescription>Key elements for GP employment contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Whether engaging GPs as employees or contractors, clear agreements are essential. Consider including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Employment Status:</strong> Employee vs. contractor arrangements
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Remuneration:</strong> Percentage split, hourly rate, or salary
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hours and On-Call Requirements:</strong> Clear expectations
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Leave Entitlements:</strong> Annual leave, sick leave, study leave
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Restraint of Trade:</strong> Non-compete clauses
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Termination Conditions:</strong> Notice periods and processes
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Professional Development:</strong> Support and requirements
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Always seek legal advice when drafting employment contracts for medical practitioners.
              </p>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help Navigating Regulatory Requirements?</h2>
          <p className="mb-6">
            Post a job on GPJobs.au and our team can provide guidance on regulatory requirements specific to your
            practice location and recruitment needs.
          </p>
          <Link href="/dashboard/jobs/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Post a Job</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
