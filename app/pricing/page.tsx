import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Facebook } from "lucide-react"

export const metadata = {
  title: "Pricing | GPJobs.au",
  description: "Pricing plans for posting GP job listings on GPJobs.au",
}

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Post your GP job listing and reach qualified candidates across Australia
          </p>
        </div>

        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Standard Job Posting</CardTitle>
            <div className="mt-4">
              <span className="text-5xl font-bold">$50</span>
              <span className="text-gray-500 ml-2">per job</span>
            </div>
            <CardDescription className="text-lg mt-4">
              Everything you need to find the right GP for your practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                <span>30-day job listing on GPJobs.au</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                <span>Featured in our GP Jobs Australia Facebook group with 8.8K members</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                <span>Shared on our Facebook page with 2.6K followers</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                <span>Detailed practice profile and job description</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                <span>Edit your listing anytime during the 30-day period</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                <span>Direct contact with interested candidates</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg">Post a Job Now</Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Secure payment via Stripe. Your job will be published immediately after payment.
            </p>
          </CardFooter>
        </Card>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Facebook className="h-6 w-6 text-blue-600 mr-3" />
            Reach Our Engaged Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">GP Jobs Australia Facebook Group</h3>
              <p className="text-gray-700 mb-3">
                Connect with our community of 8,800+ members, including GPs, practice managers, and healthcare
                professionals across Australia.
              </p>
              <a
                href="https://www.facebook.com/groups/161704354254957"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Visit Group →
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">GP Jobs Australia Facebook Page</h3>
              <p className="text-gray-700 mb-3">
                Your job will be shared with our 2,600+ followers who are interested in GP job opportunities across
                Australia.
              </p>
              <a
                href="https://www.facebook.com/gpjobsaustralia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Visit Page →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
