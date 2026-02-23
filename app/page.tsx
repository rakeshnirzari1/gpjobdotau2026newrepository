import { Hero } from "@/components/hero"
import { InfoSection } from "@/components/info-section"
import { FeatureCards } from "@/components/feature-cards"
import { RecentJobs } from "@/components/recent-jobs"
import { SearchForm } from "@/components/search-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchForm />
        </div>
        <div className="mt-8">
          <RecentJobs />
        </div>
        <InfoSection
          title="GP Recruitment in Australia"
          description="Finding the right General Practitioner position in Australia involves navigating various regulatory requirements and understanding the healthcare landscape."
        />
        <FeatureCards />
      </div>
    </main>
  )
}
