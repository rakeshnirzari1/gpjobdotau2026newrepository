import Link from "next/link"

export const metadata = {
  title: "Terms of Service | GPJobs.au",
  description: "Terms and conditions for using the GPJobs.au platform.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to GPJobs.au. By accessing or using our website, you agree to be bound by these Terms of Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using GPJobs.au, you agree to be bound by these Terms of Service and all applicable laws and
            regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this
            site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on GPJobs.au for personal, non-commercial use.
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on GPJobs.au</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
          <p>
            The materials on GPJobs.au are provided on an 'as is' basis. GPJobs.au makes no warranties, expressed or
            implied, and hereby disclaims and negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall GPJobs.au or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
            use the materials on GPJobs.au, even if GPJobs.au or a GPJobs.au authorized representative has been notified
            orally or in writing of the possibility of such damage.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Accuracy of Materials</h2>
          <p>
            The materials appearing on GPJobs.au could include technical, typographical, or photographic errors.
            GPJobs.au does not warrant that any of the materials on its website are accurate, complete or current.
            GPJobs.au may make changes to the materials contained on its website at any time without notice.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Links</h2>
          <p>
            GPJobs.au has not reviewed all of the sites linked to its website and is not responsible for the contents of
            any such linked site. The inclusion of any link does not imply endorsement by GPJobs.au of the site. Use of
            any such linked website is at the user's own risk.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Modifications</h2>
          <p>
            GPJobs.au may revise these terms of service for its website at any time without notice. By using this
            website you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Australia and you
            irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <div className="mt-12">
            <p>Last updated: {new Date().toLocaleDateString("en-AU")}</p>
            <p className="mt-4">
              If you have any questions about these Terms of Service, please{" "}
              <Link href="/contact" className="text-emerald-600 hover:text-emerald-700">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
