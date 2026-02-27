import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, TrendingUp } from "lucide-react"

export default function RetentionStrategiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/for-practices" className="text-emerald-600 hover:text-emerald-700 mb-2 inline-block">
            ← Back to For Practices
          </Link>
          <h1 className="text-4xl font-bold mb-4">GP Retention Strategies</h1>
          <p className="text-xl text-gray-600">Best practices for retaining GPs in your practice</p>
        </div>

        <div className="mb-12">
          <div className="relative h-64 w-full mb-8">
            <Image
              src="/doctor-team-meeting.jpg"
              alt="Medical team in a meeting"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <p className="mb-6">
            Recruiting a GP is just the first step. Retaining quality doctors is equally important for practice
            stability, patient continuity of care, and long-term success. This guide provides evidence-based strategies
            to improve GP retention in your practice.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why GPs Leave Practices</h2>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="mb-4">
                Understanding why GPs leave is the first step in developing effective retention strategies. Common
                reasons include:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Workload and Burnout:</strong> Excessive patient loads, administrative burden, and long
                    hours
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Financial Concerns:</strong> Inadequate or non-transparent remuneration
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lack of Support:</strong> Insufficient administrative, nursing, or collegial support
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Limited Professional Development:</strong> Few opportunities for growth or specialization
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Poor Practice Culture:</strong> Toxic workplace environment or conflicts
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Work-Life Balance:</strong> Inflexible schedules that don't accommodate personal needs
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Effective Retention Strategies</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                  1. Sustainable Workload Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>
                      Implement reasonable patient booking templates (e.g., 10-15 minutes per standard consult)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Schedule administrative time within the working day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Employ nurse practitioners or practice nurses to share clinical load</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Use medical scribes or voice recognition software to reduce documentation burden</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                  2. Competitive and Transparent Remuneration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Offer competitive percentage splits or salary packages</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Provide clear, detailed financial reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Consider performance bonuses for patient outcomes or practice growth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Offer partnership or profit-sharing opportunities for long-term GPs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                  3. Flexible Working Arrangements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Offer part-time options and job sharing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Allow for flexible start and finish times</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Consider telehealth sessions that can be conducted from home</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Accommodate family commitments and personal circumstances</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                  4. Professional Development Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Provide financial support for CPD activities and conferences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Allow protected time for professional development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Support development of special interests (e.g., skin cancer, women's health)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Facilitate GP supervisor or medical educator roles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                  5. Positive Practice Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Foster open communication and regular team meetings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Involve GPs in practice decision-making</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Recognize and celebrate achievements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Organize social events to build team cohesion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Address conflicts promptly and constructively</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                  6. Comprehensive Support Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Provide efficient administrative and reception support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Ensure adequate nursing support for procedures and care planning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Implement efficient practice management systems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Offer mentoring for new GPs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span>Provide access to mental health support and wellbeing programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Measuring Retention Success</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                Track these key metrics to evaluate the effectiveness of your retention strategies:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>GP turnover rate (annual percentage)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Average tenure of GPs at your practice</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>GP satisfaction surveys (conducted regularly)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Exit interview feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>Patient continuity of care metrics</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Improve Your GP Retention?</h2>
          <p className="mb-6">
            Post a job on GPJobs.au and attract GPs who are the right fit for your practice. Our platform helps you
            highlight your practice's unique benefits and working environment to find doctors who will thrive in your
            team.
          </p>
          <Link href="/dashboard/jobs/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Post a Job</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
