"use client"

import { useEffect, useRef, useState } from "react"

interface JobsMapProps {
  jobs?: any[]
}

export default function JobsMap({ jobs = [] }: JobsMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [error, setError] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const loadLeaflet = async () => {
      try {
        // Dynamically import Leaflet
        const L = (await import("leaflet")).default
        await import("leaflet/dist/leaflet.css")

        // Only initialize the map once
        if (!mapInstanceRef.current) {
          // Create map instance
          mapInstanceRef.current = L.map(mapRef.current).setView([-25.2744, 133.7751], 4) // Center of Australia

          // Add OpenStreetMap tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstanceRef.current)
        }

        setIsMapLoaded(true)
      } catch (error) {
        console.error("Error loading Leaflet:", error)
        setError(true)
      }
    }

    loadLeaflet()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  if (error) {
    return (
      <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Map view is currently unavailable</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className="h-full w-full" />
}
