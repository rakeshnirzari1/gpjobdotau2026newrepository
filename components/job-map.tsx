"use client"

import { useEffect, useRef, useState } from "react"

interface JobMapProps {
  location: string
  practiceName: string
}

export default function JobMap({ location, practiceName }: JobMapProps) {
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
          mapInstanceRef.current = L.map(mapRef.current).setView([-33.8688, 151.2093], 13) // Default to Sydney

          // Add OpenStreetMap tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstanceRef.current)
        }

        // Geocode the location using Nominatim (OpenStreetMap's geocoding service)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
          )
          const data = await response.json()

          if (data && data.length > 0) {
            const { lat, lon } = data[0]

            // Update map view
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView([Number.parseFloat(lat), Number.parseFloat(lon)], 15)

              // Add marker
              L.marker([Number.parseFloat(lat), Number.parseFloat(lon)])
                .addTo(mapInstanceRef.current)
                .bindPopup(`<b>${practiceName}</b><br>${location}`)
                .openPopup()
            }
          }
          setIsMapLoaded(true)
        } catch (error) {
          console.error("Error geocoding location:", error)
          setError(true)
        }
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
  }, [location, practiceName])

  if (error) {
    return (
      <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Map view is currently unavailable</p>
          <p className="text-sm text-gray-400">{location}</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className="h-full w-full" />
}
