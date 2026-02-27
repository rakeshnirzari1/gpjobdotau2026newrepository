import Image from "next/image"
import { Stethoscope, MapPin, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-hero-bg overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Image
          src="/welcoming-clinic-exterior.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_30%_50%,hsl(160_84%_28%/0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              Australia{"'"}s GP Recruitment Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-hero-foreground mb-6 leading-tight">
            Connecting GPs with the Right Practices Across Australia
          </h1>

          <p className="text-lg md:text-xl text-hero-foreground/70 mb-10 leading-relaxed max-w-2xl">
            Navigate the complexities of GP recruitment with expert guidance on AHPRA registration, Medicare provider
            numbers, and practice requirements.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2.5 text-hero-foreground/60">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 border border-primary/20">
                <Stethoscope className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">AHPRA Registered</span>
            </div>
            <div className="flex items-center gap-2.5 text-hero-foreground/60">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 border border-primary/20">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">DPA & MMM Classified</span>
            </div>
            <div className="flex items-center gap-2.5 text-hero-foreground/60">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 border border-primary/20">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">11K+ Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border/20 z-10" />
    </section>
  )
}
