"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the map component with no SSR
const JobMap = dynamic(() => import("@/components/job-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

interface JobMapWrapperProps {
  job: {
    suburb: string
    state: string
    postcode: string
    practice_name: string
  }
}

export function JobMapWrapper({ job }: JobMapWrapperProps) {
  // Format the full address for better geocoding results
  const location = `${job.suburb}, ${job.state} ${job.postcode}, Australia`

  return (
    <Suspense
      fallback={
        <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      }
    >
      <JobMap location={location} practiceName={job.practice_name} />
    </Suspense>
  )
}
