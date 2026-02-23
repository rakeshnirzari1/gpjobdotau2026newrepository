import { Award, MapPin, BookOpen, FileText, GraduationCap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeatureCards() {
  const features = [
    {
      title: "AHPRA Registration",
      description:
        "Guidance on Australian Health Practitioner Regulation Agency registration requirements for local and international medical graduates.",
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      link: "https://www.ahpra.gov.au/Registration.aspx",
    },
    {
      title: "Medicare Provider Numbers",
      description:
        "Information about obtaining Medicare Provider Numbers and navigating the 19AA and 19AB restrictions of the Health Insurance Act.",
      icon: <FileText className="h-8 w-8 text-emerald-600" />,
      link: "https://www.servicesaustralia.gov.au/organisations/health-professionals/services/medicare/medicare-benefits-health-professionals",
    },
    {
      title: "Distribution Priority Areas",
      description: "Understanding DPA classifications and how they affect GP recruitment and practice eligibility.",
      icon: <MapPin className="h-8 w-8 text-emerald-600" />,
      link: "https://www.health.gov.au/health-topics/health-workforce/health-workforce-classifications/distribution-priority-area",
    },
    {
      title: "Modified Monash Model",
      description:
        "Explanation of the MMM geographical classification system and its impact on GP placements and incentives.",
      icon: <MapPin className="h-8 w-8 text-emerald-600" />,
      link: "https://www.health.gov.au/health-topics/health-workforce/health-workforce-classifications/modified-monash-model",
    },
    {
      title: "GP Training Programs",
      description:
        "Information on various pathways including FSP, PEP, MDRAP, IP, and RVTS for GP qualification and upskilling.",
      icon: <GraduationCap className="h-8 w-8 text-emerald-600" />,
      link: "https://www.racgp.org.au/education/registrars/fellowship-pathways",
    },
    {
      title: "College Requirements",
      description: "Details on RACGP and ACRRM fellowship requirements and continuing professional development.",
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      link: "https://www.racgp.org.au/education/registrars/fellowship-of-the-racgp/policies",
    },
  ]

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Key Information for GP Recruitment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <a href={feature.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2">
                Learn More
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
