import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About GPJob.au | GP Recruitment Platform",
  description:
    "Learn about GPJob.au, Australia's dedicated platform connecting General Practitioners with medical practices across the country.",
  openGraph: {
    title: "About GPJob.au | GP Recruitment Platform",
    description:
      "Learn about GPJob.au, Australia's dedicated platform connecting General Practitioners with medical practices across the country.",
  },
}

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="bg-hero-bg">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-hero-foreground mb-4">About GPJob.au</h1>
            <p className="text-lg text-hero-foreground/70 leading-relaxed">
              Australia{"'"}s dedicated job platform connecting General Practitioners with medical practices
              across the country.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-muted-foreground leading-relaxed">
              Founded by healthcare professionals who understand the unique challenges of GP recruitment in Australia, our
              platform simplifies the complex process of matching qualified doctors with the right practices.
            </p>
          </div>

          <div className="bg-section-alt rounded-xl border border-border p-8 md:p-10 mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 relative h-64 w-full rounded-lg overflow-hidden">
                <Image src="/collaborative-care-team.png" alt="Our team" fill className="object-cover" />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We{"'"}re committed to addressing Australia{"'"}s healthcare workforce distribution challenges by connecting GPs
                  with practices where they{"'"}re needed most, while providing comprehensive resources to navigate the
                  regulatory landscape.
                </p>
                <Link href="/contact">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Contact Our Team</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">For Doctors</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Access to quality GP positions across Australia, with detailed information about practice environments,
                  DPA/MMM classifications, and support for registration and Medicare provider number processes.
                </p>
                <Link href="/for-doctors" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  Learn more &rarr;
                </Link>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">For Practices</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  A targeted platform to advertise GP vacancies to qualified candidates, with resources on recruitment
                  best practices, regulatory requirements, and retention strategies.
                </p>
                <Link href="/for-practices" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  Learn more &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Our Expertise</h2>
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Our team brings extensive experience in Australian healthcare recruitment, medical registration processes,
                  and rural workforce development. We understand the nuances of AHPRA registration, Medicare provider numbers,
                  and the various pathways for both Australian-trained doctors and International Medical Graduates.
                </p>
                <p>
                  Whether you{"'"}re a practice looking to recruit or a GP seeking your next opportunity, GPJob.au provides the
                  specialized knowledge and connections you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
