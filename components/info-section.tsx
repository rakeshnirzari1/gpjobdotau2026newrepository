interface InfoSectionProps {
  title: string
  description: string
}

export function InfoSection({ title, description }: InfoSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">{description}</p>
        </div>
        <div className="bg-section-alt rounded-xl border border-border p-8">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              GP recruitment in Australia involves navigating complex regulatory requirements including AHPRA
              registration, Medicare provider numbers, and understanding geographical classifications like Distribution
              Priority Areas (DPA) and the Modified Monash Model (MMM).
            </p>
            <p>
              For international medical graduates, additional pathways such as the Fellowship Support Program (FSP),
              Practice Experience Program (PEP), and More Doctors for Rural Australia Program (MDRAP) provide routes to
              practice in Australia while working towards fellowship with the Royal Australian College of General
              Practitioners (RACGP) or the Australian College of Rural and Remote Medicine (ACRRM).
            </p>
            <p>
              GPJob.au provides comprehensive information and resources to help both practices and doctors navigate these
              requirements efficiently, connecting the right doctors with the right practices across Australia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
