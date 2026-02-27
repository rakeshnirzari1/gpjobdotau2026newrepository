import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About GPJobs.au | GP Recruitment Platform",
  description:
    "Learn about GPJobs.au, Australia's dedicated platform connecting General Practitioners with medical practices across the country.",
  openGraph: {
    title: "About GPJobs.au | GP Recruitment Platform",
    description:
      "Learn about GPJobs.au, Australia's dedicated platform connecting General Practitioners with medical practices across the country.",
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About GPJobs.au</h1>

        <div className="mb-8">
          <p className="text-lg mb-4">
            GPJobs.au is Australia's dedicated job platform connecting General Practitioners with medical practices
            across the country.
          </p>
          <p className="mb-4">
            Founded by healthcare professionals who understand the unique challenges of GP recruitment in Australia, our
            platform simplifies the complex process of matching qualified doctors with the right practices.
          </p>
        </div>

        <div className="bg-emerald-50 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 relative h-64 w-full">
              <Image src="/collaborative-care-team.png" alt="Our team" fill className="object-cover rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="mb-6">
                We're committed to addressing Australia's healthcare workforce distribution challenges by connecting GPs
                with practices where they're needed most, while providing comprehensive resources to navigate the
                regulatory landscape.
              </p>
              <Link href="/contact">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Contact Our Team</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">For Doctors</h3>
              <p className="mb-4">
                Access to quality GP positions across Australia, with detailed information about practice environments,
                DPA/MMM classifications, and support for registration and Medicare provider number processes.
              </p>
              <Link href="/for-doctors" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Learn more →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">For Practices</h3>
              <p className="mb-4">
                A targeted platform to advertise GP vacancies to qualified candidates, with resources on recruitment
                best practices, regulatory requirements, and retention strategies.
              </p>
              <Link href="/for-practices" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Our Expertise</h2>
          <p className="mb-4">
            Our team brings extensive experience in Australian healthcare recruitment, medical registration processes,
            and rural workforce development. We understand the nuances of AHPRA registration, Medicare provider numbers,
            and the various pathways for both Australian-trained doctors and International Medical Graduates.
          </p>
          <p>
            Whether you're a practice looking to recruit or a GP seeking your next opportunity, GPJobs.au provides the
            specialized knowledge and connections you need to succeed.
          </p>
        </div>
      </div>
    </div>
  )
}
