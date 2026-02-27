interface InfoSectionProps {
  title: string
  description: string
}

export function InfoSection({ title, description }: InfoSectionProps) {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{description}</p>
        <div className="mt-8 space-y-4 text-left">
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
            GPJobs.au provides comprehensive information and resources to help both practices and doctors navigate these
            requirements efficiently, connecting the right doctors with the right practices across Australia.
          </p>
        </div>
      </div>
    </div>
  )
}
