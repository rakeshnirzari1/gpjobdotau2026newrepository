import Image from "next/image"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MapPin, FileText, Calendar } from "lucide-react"

export const metadata = {
  title: "For Medical Practices | GPJobs.au",
  description:
    "Comprehensive resources for medical practices on GP recruitment, DPA and MMM classifications, regulatory requirements, and retention strategies.",
  openGraph: {
    title: "For Medical Practices | GPJobs.au",
    description:
      "Comprehensive resources for medical practices on GP recruitment, DPA and MMM classifications, regulatory requirements, and retention strategies.",
  },
}

export default function ForPractices() {
  const resources = [
    {
      title: "GP Recruitment Guide",
      description: "Comprehensive guide to recruiting GPs for your practice",
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      link: "/for-practices/recruitment-guide",
    },
    {
      title: "DPA & MMM Classifications",
      description: "Understanding geographical classifications and their impact",
      icon: <MapPin className="h-8 w-8 text-emerald-600" />,
      link: "/for-practices/classifications",
    },
    {
      title: "Regulatory Requirements",
      description: "Navigate the regulatory landscape for GP employment",
      icon: <FileText className="h-8 w-8 text-emerald-600" />,
      link: "/for-practices/regulatory-requirements",
    },
    {
      title: "Retention Strategies",
      description: "Best practices for retaining GPs in your practice",
      icon: <Calendar className="h-8 w-8 text-emerald-600" />,
      link: "/for-practices/retention-strategies",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Create Your Practice Profile",
      description:
        "Showcase your practice's unique features, facilities, and team culture to attract the right candidates.",
    },
    {
      number: "02",
      title: "Post Your Job Opportunity",
      description: "Create a detailed job listing highlighting the role, requirements, and benefits package.",
    },
    {
      number: "03",
      title: "Connect with Qualified GPs",
      description: "Review applications from interested GPs and connect directly through our platform.",
    },
    {
      number: "04",
      title: "Finalize Your Recruitment",
      description: "Complete the recruitment process with our support for a smooth onboarding experience.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">For Medical Practices</h1>
        <p className="text-xl mb-12">
          Find the right GPs for your practice with our comprehensive recruitment resources and support services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {resources.map((resource, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="mb-4">{resource.icon}</div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={resource.link}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 relative h-64 w-full">
              <Image
                src="/welcoming-medical-reception.png"
                alt="Medical practice reception"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Ready to Find Your Next GP?</h2>
              <p className="mb-6">
                Post a job listing today and connect with qualified GPs looking for opportunities like yours. Our
                platform specializes in matching practices with doctors based on location, requirements, and
                preferences.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Post a Job</Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What is a Distribution Priority Area (DPA) and how does it affect my practice?
              </h3>
              <p className="text-gray-700">
                A Distribution Priority Area (DPA) is a geographical classification that identifies areas with a
                shortage of medical practitioners. If your practice is in a DPA, you can recruit International Medical
                Graduates and bonded medical practitioners, giving you access to a wider pool of candidates.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                How can I determine my practice's Modified Monash Model (MMM) classification?
              </h3>
              <p className="text-gray-700">
                The Modified Monash Model (MMM) is a geographical classification system that categorizes areas based on
                remoteness, from MM1 (major cities) to MM7 (very remote communities). You can check your practice's MMM
                classification using the Health Workforce Locator tool on the Department of Health website.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What supervision requirements apply when hiring International Medical Graduates?
              </h3>
              <p className="text-gray-700">
                Supervision requirements vary depending on the IMG's registration type and experience. Generally, IMGs
                with limited or provisional registration require supervision by a Fellow of the RACGP or ACRRM. The
                level of supervision (from Level 1 direct supervision to Level 4 remote supervision) is determined by
                AHPRA based on the doctor's experience and qualifications.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What incentives are available for practices in rural and remote areas?
              </h3>
              <p className="text-gray-700">
                Various incentives are available for practices in rural and remote areas, including the Rural Procedural
                Grants Program, Workforce Incentive Program, and additional Medicare billing options. These incentives
                aim to support recruitment and retention of GPs in underserved areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
