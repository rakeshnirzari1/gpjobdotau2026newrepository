import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function Resources() {
  const resourceCategories = [
    {
      title: "Regulatory Bodies",
      resources: [
        {
          title: "AHPRA (Australian Health Practitioner Regulation Agency)",
          description: "Registration requirements and standards for medical practitioners in Australia",
          link: "https://www.ahpra.gov.au/",
        },
        {
          title: "Medical Board of Australia",
          description: "Registration standards, codes, guidelines and policies for medical practitioners",
          link: "https://www.medicalboard.gov.au/",
        },
        {
          title: "Services Australia",
          description: "Medicare provider number applications and information",
          link: "https://www.servicesaustralia.gov.au/",
        },
      ],
    },
    {
      title: "Medical Colleges",
      resources: [
        {
          title: "Royal Australian College of General Practitioners (RACGP)",
          description: "Fellowship pathways, CPD requirements, and resources for GPs",
          link: "https://www.racgp.org.au/",
        },
        {
          title: "Australian College of Rural and Remote Medicine (ACRRM)",
          description: "Rural generalist training and fellowship information",
          link: "https://www.acrrm.org.au/",
        },
      ],
    },
    {
      title: "GP Training Programs",
      resources: [
        {
          title: "Practice Experience Program (PEP)",
          description: "Self-directed education program for non-vocationally registered doctors",
          link: "https://www.racgp.org.au/education/imgs/fellowship-pathways/practice-experience-program",
        },
        {
          title: "More Doctors for Rural Australia Program (MDRAP)",
          description: "Support for non-vocationally registered doctors to work in rural and remote communities",
          link: "https://www.health.gov.au/initiatives-and-programs/more-doctors-for-rural-australia-program",
        },
        {
          title: "Remote Vocational Training Scheme (RVTS)",
          description: "GP training for doctors in remote and isolated communities",
          link: "https://rvts.org.au/",
        },
      ],
    },
    {
      title: "Government Resources",
      resources: [
        {
          title: "Department of Health",
          description: "Information on health workforce programs and policies",
          link: "https://www.health.gov.au/",
        },
        {
          title: "Health Workforce Locator",
          description: "Tool to check DPA and MMM classifications",
          link: "https://www.health.gov.au/resources/apps-and-tools/health-workforce-locator",
        },
        {
          title: "Rural Health Australia",
          description: "Resources for rural health professionals and communities",
          link: "https://www.ruralhealth.org.au/",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Resources</h1>
        <p className="text-xl mb-12">
          Access comprehensive resources for GP recruitment, registration, and practice management in Australia.
        </p>

        {resourceCategories.map((category, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
            <div className="space-y-6">
              {category.resources.map((resource, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="flex items-center gap-2">
                        Visit Website
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Additional Resources?</h2>
          <p className="mb-6">
            Our team can provide personalized guidance and additional resources tailored to your specific situation.
            Whether you're a practice looking to recruit or a doctor seeking opportunities, we're here to help.
          </p>
          <div className="flex gap-4">
            <Link href="/contact">
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                Contact Us
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">About Our Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
