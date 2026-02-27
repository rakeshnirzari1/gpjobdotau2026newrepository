import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | GPJobs.au",
  description: "Privacy policy for GPJobs.au - how we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            At GPJobs.au, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Collection of Information</h2>
          <p>We collect information that you provide directly to us when you:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Register for an account</li>
            <li>Create or modify your profile</li>
            <li>Post job listings</li>
            <li>Apply for jobs</li>
            <li>Contact us</li>
            <li>Respond to surveys</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Types of Information We Collect</h2>
          <p>The types of information we may collect include:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Personal identifiers (name, email address, phone number)</li>
            <li>Professional information (qualifications, experience, registration details)</li>
            <li>Login information (username, password)</li>
            <li>Usage data (how you interact with our website)</li>
            <li>Device information (IP address, browser type)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions</li>
            <li>Send administrative information</li>
            <li>Respond to inquiries and offer support</li>
            <li>Monitor usage patterns and analyze trends</li>
            <li>Protect against, identify, and prevent fraud and other illegal activity</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Disclosure of Information</h2>
          <p>We may share information as follows:</p>
          <ul className="list-disc pl-6 my-4">
            <li>With employers when you apply for jobs</li>
            <li>With job seekers when you post job listings</li>
            <li>With service providers who perform services on our behalf</li>
            <li>If required by law or to protect rights and safety</li>
            <li>In connection with a business transaction such as a merger or acquisition</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Security of Information</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the information we collect and
            store. However, no security system is impenetrable, and we cannot guarantee the security of our systems
            100%.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <div className="mt-12">
            <p>Last updated: {new Date().toLocaleDateString("en-AU")}</p>
            <p className="mt-4">
              If you have any questions about this Privacy Policy, please{" "}
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
