import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata = {
  title: "Information for Doctors | GPJobs.au",
  description:
    "Resources for Australian-trained GPs and International Medical Graduates on AHPRA registration, Medicare provider numbers, and training pathways.",
  openGraph: {
    title: "Information for Doctors | GPJobs.au",
    description:
      "Resources for Australian-trained GPs and International Medical Graduates on AHPRA registration, Medicare provider numbers, and training pathways.",
  },
}

export default function ForDoctors() {
  const pathways = [
    {
      title: "Australian Trained GPs",
      description: "Information for doctors who completed their medical training in Australia",
      items: [
        "RACGP Fellowship requirements",
        "ACRRM Fellowship requirements",
        "Medicare Provider Number application",
        "Continuing Professional Development",
      ],
      link: "/for-doctors/australian-trained",
    },
    {
      title: "International Medical Graduates",
      description: "Guidance for overseas trained doctors seeking to practice in Australia",
      items: [
        "AHPRA registration pathways",
        "Specialist recognition process",
        "19AB exemptions",
        "Supervised practice options",
      ],
      link: "/for-doctors/international-graduates",
    },
    {
      title: "GP Training Programs",
      description: "Overview of available training pathways for becoming a GP in Australia",
      items: [
        "Fellowship Support Program (FSP)",
        "Practice Experience Program (PEP)",
        "More Doctors for Rural Australia Program (MDRAP)",
        "Independent Pathway (IP)",
      ],
      link: "/for-doctors/training-programs",
    },
    {
      title: "Rural & Remote Practice",
      description: "Information about practicing in rural and remote locations",
      items: [
        "Modified Monash Model classifications",
        "Rural incentive programs",
        "Remote Vocational Training Scheme (RVTS)",
        "Rural generalist pathways",
      ],
      link: "/for-doctors/rural-remote",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Information for Doctors</h1>
        <p className="text-xl mb-12">
          Whether you're an Australian-trained GP or an International Medical Graduate, find all the information you
          need about practicing as a GP in Australia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {pathways.map((pathway, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle>{pathway.title}</CardTitle>
                <CardDescription>{pathway.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pathway.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={pathway.link}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-emerald-50 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 relative h-64 w-full">
              <Image src="/smiling-doctor.png" alt="Doctor with stethoscope" fill className="object-cover rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h2>
              <p className="mb-6">
                Navigating the Australian healthcare system can be complex. Our team can provide personalized advice
                based on your qualifications, experience, and career goals.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Contact Our Advisors</Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">What is the difference between RACGP and ACRRM?</h3>
              <p className="text-gray-700">
                The Royal Australian College of General Practitioners (RACGP) and the Australian College of Rural and
                Remote Medicine (ACRRM) are the two colleges that provide GP training and fellowship in Australia. RACGP
                focuses on general practice across all settings, while ACRRM specializes in rural and remote medicine
                with additional procedural skills.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What is a Distribution Priority Area (DPA)?</h3>
              <p className="text-gray-700">
                A Distribution Priority Area (DPA) is a geographical classification that identifies areas with a
                shortage of medical practitioners. International Medical Graduates and bonded medical practitioners are
                generally restricted to working in DPA locations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I obtain a Medicare Provider Number?</h3>
              <p className="text-gray-700">
                To obtain a Medicare Provider Number, you need to apply through Services Australia. Requirements vary
                depending on your qualifications and visa status. Australian-trained doctors and those with specialist
                recognition can apply directly, while IMGs may need to work under supervision and in DPA locations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What is Section 19AB of the Health Insurance Act?</h3>
              <p className="text-gray-700">
                Section 19AB of the Health Insurance Act restricts overseas trained doctors and foreign graduates of
                Australian medical schools from accessing Medicare benefits unless they work in DPA locations. This
                restriction typically applies for a period of 10 years from initial registration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
