import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function RecruitmentGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-practices" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Practices
          </Link>
          <h1 className="text-4xl font-bold mb-4">GP Recruitment Guide</h1>
          <p className="text-xl text-gray-600">Comprehensive guide to recruiting GPs for your medical practice</p>
        </div>

        <div className="mb-12">
          <div className="relative h-64 w-full mb-8">
            <Image
              src="/medical-team-meeting.jpg"
              alt="Medical team in a meeting"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <p className="mb-6">
            Recruiting qualified GPs is one of the biggest challenges facing medical practices in Australia today. This
            guide provides practical strategies and insights to help your practice attract and retain the right doctors.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Understanding the GP Recruitment Landscape</h2>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="mb-4">
                Before starting your recruitment process, it's important to understand the current landscape and
                challenges:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>GP Shortage:</strong> Australia faces an ongoing shortage of GPs, particularly in rural and
                    remote areas.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Regulatory Complexity:</strong> International Medical Graduates face restrictions on where
                    they can practice (Section 19AB).
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Changing Preferences:</strong> Younger GPs often prioritize work-life balance and flexible
                    working arrangements.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Competition:</strong> Practices are competing for a limited pool of qualified GPs.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recruitment Strategy Checklist</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Define Your Practice Needs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Determine the number of sessions and hours required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Identify specific skills or special interests needed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Consider long-term succession planning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Assess your supervision capacity for registrars or IMGs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Create an Attractive Job Package</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Competitive remuneration structure (percentage of billings or salary)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Flexible working arrangements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Professional development support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Relocation assistance if applicable</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Clear career progression opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Craft a Compelling Job Advertisement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Do:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                        <span>Highlight your practice's unique selling points</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                        <span>Include information about your team and culture</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                        <span>Specify DPA/MMM status for IMGs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                        <span>Be clear about remuneration and benefits</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Don't:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                        <span>Use generic descriptions</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                        <span>Hide important details about workload</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                        <span>Forget to mention location advantages</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                        <span>Neglect to include contact information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Effective Interview Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Prepare structured interview questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Involve key team members in the process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Offer a practice tour and team introduction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Be prepared to answer questions about the local area</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Check references thoroughly</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Onboarding and Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Develop a comprehensive orientation program</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Assign a mentor or buddy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Schedule regular check-ins during the first few months</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Provide support for administrative and Medicare processes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Help with community integration for relocating GPs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Recruiting?</h2>
          <p className="mb-6">
            Post a job listing on GPJobs.au to reach qualified GPs across Australia. Our platform specializes in
            connecting practices with doctors based on location, requirements, and preferences.
          </p>
          <Link href="/dashboard/jobs/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Post a Job</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
