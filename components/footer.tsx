import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GPJobs.au</h3>
            <p className="text-gray-400">
              Connecting GPs with the right practices across Australia, simplifying the complex recruitment process.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Doctors</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.ahpra.gov.au/Registration.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  AHPRA Registration
                </a>
              </li>
              <li>
                <a
                  href="https://www.servicesaustralia.gov.au/organisations/health-professionals/services/medicare/medicare-benefits-health-professionals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Medicare Provider Numbers
                </a>
              </li>
              <li>
                <Link href="/for-doctors/training-programs" className="text-gray-400 hover:text-white">
                  GP Training Programs
                </Link>
              </li>
              <li>
                <Link href="/for-doctors/international-graduates" className="text-gray-400 hover:text-white">
                  IMG Pathways
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Practices</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/for-practices/recruitment-guide" className="text-gray-400 hover:text-white">
                  Recruitment Guide
                </Link>
              </li>
              <li>
                <Link href="/for-practices/classifications" className="text-gray-400 hover:text-white">
                  DPA & MMM Classifications
                </Link>
              </li>
              <li>
                <Link href="/for-practices/regulatory-requirements" className="text-gray-400 hover:text-white">
                  Regulatory Requirements
                </Link>
              </li>
              <li>
                <Link href="/dashboard/jobs/new" className="text-gray-400 hover:text-white">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.ahpra.gov.au/Resources.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  AHPRA Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.racgp.org.au/education/education-providers/regional-training/fellowship-support-program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  RACGP Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.acrrm.org.au/resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  ACRRM Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.health.gov.au/health-topics/health-workforce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Health Workforce Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} GPJobs.au. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
