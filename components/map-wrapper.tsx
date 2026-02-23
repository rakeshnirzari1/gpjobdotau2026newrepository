"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the map component with no SSR
const JobsMap = dynamic(() => import("@/components/jobs-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export function MapWrapper() {
  return (
    <Suspense
      fallback={
        <div className="h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      }
    >
      <JobsMap />
    </Suspense>
  )
}
