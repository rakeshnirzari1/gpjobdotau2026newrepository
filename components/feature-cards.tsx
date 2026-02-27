import { Award, MapPin, BookOpen, FileText, GraduationCap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeatureCards() {
  const features = [
    {
      title: "AHPRA Registration",
      description:
        "Guidance on Australian Health Practitioner Regulation Agency registration requirements for local and international medical graduates.",
      icon: <Award className="h-5 w-5" />,
      link: "https://www.ahpra.gov.au/Registration.aspx",
    },
    {
      title: "Medicare Provider Numbers",
      description:
        "Information about obtaining Medicare Provider Numbers and navigating the 19AA and 19AB restrictions of the Health Insurance Act.",
      icon: <FileText className="h-5 w-5" />,
      link: "https://www.servicesaustralia.gov.au/organisations/health-professionals/services/medicare/medicare-benefits-health-professionals",
    },
    {
      title: "Distribution Priority Areas",
      description: "Understanding DPA classifications and how they affect GP recruitment and practice eligibility.",
      icon: <MapPin className="h-5 w-5" />,
      link: "https://www.health.gov.au/health-topics/health-workforce/health-workforce-classifications/distribution-priority-area",
    },
    {
      title: "Modified Monash Model",
      description:
        "Explanation of the MMM geographical classification system and its impact on GP placements and incentives.",
      icon: <MapPin className="h-5 w-5" />,
      link: "https://www.health.gov.au/health-topics/health-workforce/health-workforce-classifications/modified-monash-model",
    },
    {
      title: "GP Training Programs",
      description:
        "Information on various pathways including FSP, PEP, MDRAP, IP, and RVTS for GP qualification and upskilling.",
      icon: <GraduationCap className="h-5 w-5" />,
      link: "https://www.racgp.org.au/education/registrars/fellowship-pathways",
    },
    {
      title: "College Requirements",
      description: "Details on RACGP and ACRRM fellowship requirements and continuing professional development.",
      icon: <BookOpen className="h-5 w-5" />,
      link: "https://www.racgp.org.au/education/registrars/fellowship-of-the-racgp/policies",
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Key Information for GP Recruitment</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Essential resources to navigate the Australian GP recruitment landscape</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-card p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{feature.description}</p>
            <a href={feature.link} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-primary hover:text-primary hover:bg-primary/5 px-0"
              >
                Learn More
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
