import ContactPageClient from "./ContactPageClient"

export const metadata = {
  title: "Contact Us | GPJobs.au",
  description:
    "Get in touch with the GPJobs.au team. Have questions about GP recruitment or using our platform? Contact us today.",
  openGraph: {
    title: "Contact Us | GPJobs.au",
    description:
      "Get in touch with the GPJobs.au team. Have questions about GP recruitment or using our platform? Contact us today.",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
