import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-hero-bg text-hero-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary">
                <span className="text-xs font-bold text-primary-foreground">GP</span>
              </div>
              <span className="text-lg font-serif font-bold text-hero-foreground">
                Job<span className="text-primary">.au</span>
              </span>
            </div>
            <p className="text-hero-foreground/50 text-sm leading-relaxed">
              Connecting GPs with the right practices across Australia, simplifying the complex recruitment process.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-hero-foreground/70 mb-4">For Doctors</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.ahpra.gov.au/Registration.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-hero-foreground/50 hover:text-primary transition-colors"
                >
                  AHPRA Registration
                </a>
              </li>
              <li>
                <a
                  href="https://www.servicesaustralia.gov.au/organisations/health-professionals/services/medicare/medicare-benefits-health-professionals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-hero-foreground/50 hover:text-primary transition-colors"
                >
                  Medicare Provider Numbers
                </a>
              </li>
              <li>
                <Link href="/for-doctors/training-programs" className="text-sm text-hero-foreground/50 hover:text-primary transition-colors">
                  GP Training Programs
                </Link>
              </li>
              <li>
                <Link href="/for-doctors/international-graduates" className="text-sm text-hero-foreground/50 hover:text-primary transition-colors">
                  IMG Pathways
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-hero-foreground/70 mb-4">For Practices</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/for-practices/recruitment-guide" className="text-sm text-hero-foreground/50 hover:text-primary transition-colors">
                  Recruitment Guide
                </Link>
              </li>
              <li>
                <Link href="/for-practices/classifications" className="text-sm text-hero-foreground/50 hover:text-primary transition-colors">
                  DPA & MMM Classifications
                </Link>
              </li>
              <li>
                <Link href="/for-practices/regulatory-requirements" className="text-sm text-hero-foreground/50 hover:text-primary transition-colors">
                  Regulatory Requirements
                </Link>
              </li>
              <li>
                <Link href="/dashboard/jobs/new" className="text-sm text-hero-foreground/50 hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-hero-foreground/70 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.ahpra.gov.au/Resources.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-hero-foreground/50 hover:text-primary transition-colors"
                >
                  AHPRA Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.racgp.org.au/education/education-providers/regional-training/fellowship-support-program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-hero-foreground/50 hover:text-primary transition-colors"
                >
                  RACGP Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.acrrm.org.au/resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-hero-foreground/50 hover:text-primary transition-colors"
                >
                  ACRRM Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.health.gov.au/health-topics/health-workforce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-hero-foreground/50 hover:text-primary transition-colors"
                >
                  Health Workforce Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hero-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-hero-foreground/40">
            &copy; {new Date().getFullYear()} GPJob.au. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm text-hero-foreground/40 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-hero-foreground/40 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-hero-foreground/40 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
