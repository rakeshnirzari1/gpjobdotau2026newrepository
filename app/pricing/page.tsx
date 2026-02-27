import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Facebook } from "lucide-react"

export const metadata = {
  title: "Pricing | GPJob.au",
  description: "Pricing plans for posting GP job listings on GPJob.au",
}

export default function PricingPage() {
  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="bg-hero-bg">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-hero-foreground mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-hero-foreground/70 leading-relaxed">
              Post your GP job listing and reach qualified candidates across Australia
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-12 bg-card border-border overflow-hidden">
            <CardHeader className="text-center pb-4 pt-10">
              <CardTitle className="text-2xl font-serif text-card-foreground">Standard Job Posting</CardTitle>
              <div className="mt-6">
                <span className="text-5xl font-bold text-foreground">$50</span>
                <span className="text-muted-foreground ml-2">per job</span>
              </div>
              <CardDescription className="text-base mt-4 text-muted-foreground">
                Everything you need to find the right GP for your practice
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 md:px-12">
              <ul className="space-y-4">
                {[
                  "30-day job listing on GPJob.au",
                  "Featured in our GP Jobs Australia Facebook group with 8.8K members",
                  "Shared on our Facebook page with 2.6K followers",
                  "Detailed practice profile and job description",
                  "Edit your listing anytime during the 30-day period",
                  "Direct contact with interested candidates",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-center px-8 md:px-12 pb-10 pt-8">
              <Link href="/register">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 text-lg h-12">
                  Post a Job Now
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Secure payment via Stripe. Your job will be published immediately after payment.
              </p>
            </CardFooter>
          </Card>

          <div className="bg-section-alt rounded-xl border border-border p-8 md:p-10">
            <h2 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                <Facebook className="h-5 w-5" />
              </div>
              Reach Our Engaged Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-2">GP Jobs Australia Facebook Group</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  Connect with our community of 8,800+ members, including GPs, practice managers, and healthcare
                  professionals across Australia.
                </p>
                <a
                  href="https://www.facebook.com/groups/161704354254957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Visit Group &rarr;
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">GP Jobs Australia Facebook Page</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  Your job will be shared with our 2,600+ followers who are interested in GP job opportunities across
                  Australia.
                </p>
                <a
                  href="https://www.facebook.com/gpjobsaustralia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Visit Page &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
