import Image from "next/image"

export function Hero() {
  return (
    <div className="relative bg-emerald-700 text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image src="/welcoming-clinic-exterior.png" alt="Background" fill className="object-cover" priority />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connecting GPs with the Right Practices Across Australia
          </h1>
          <p className="text-xl mb-8">
            Navigate the complexities of GP recruitment with expert guidance on AHPRA registration, Medicare provider
            numbers, and practice requirements.
          </p>
        </div>
      </div>
    </div>
  )
}
