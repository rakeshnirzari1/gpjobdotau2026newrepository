"use client"

import { useEffect, useRef, useState } from "react"

interface JobMapProps {
  location: string
  practiceName: string
}

export default function JobMap({ location, practiceName }: JobMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const scriptLoadedRef = useRef(false)
  const mapInitializedRef = useRef(false)

  // Load the Google Maps script
  useEffect(() => {
    if (scriptLoadedRef.current) return

    async function loadGoogleMaps() {
      try {
        // Fetch the map script URL from our API
        const response = await fetch("/api/maps")
        const data = await response.json()

        if (!data.url) {
          console.error("Failed to get map script URL:", data.error)
          setError(true)
          setIsLoading(false)
          return
        }

        // Create script element with proper async attribute
        const script = document.createElement("script")
        script.src = data.url
        script.async = true
        script.defer = true

        script.onerror = () => {
          console.error("Error loading Google Maps script")
          setError(true)
          setIsLoading(false)
        }

        // Define the callback function that Google Maps will call
        window.initMap = () => {
          initializeMap()
        }

        // Append the script to the document
        document.head.appendChild(script)
        scriptLoadedRef.current = true
      } catch (err) {
        console.error("Error setting up Google Maps:", err)
        setError(true)
        setIsLoading(false)
      }
    }

    // Define the global initMap function
    if (typeof window !== "undefined" && !window.initMap) {
      window.initMap = () => {
        initializeMap()
      }
    }

    loadGoogleMaps()

    // Clean up
    return () => {
      if (typeof window !== "undefined" && window.google && window.google.maps) {
        window.google.maps = undefined
      }
    }
  }, [])

  // Initialize the map once Google Maps is loaded
  function initializeMap() {
    if (!mapRef.current || !window.google || !window.google.maps || mapInitializedRef.current) return

    try {
      mapInitializedRef.current = true

      // Create a new map instance
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -25.2744, lng: 133.7751 }, // Default to center of Australia
        zoom: 4,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })

      // Create a geocoder instance
      const geocoder = new window.google.maps.Geocoder()

      // Geocode the address
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const position = results[0].geometry.location

          // Center the map on the geocoded location
          map.setCenter(position)
          map.setZoom(15)

          // Create a marker at the geocoded location
          const marker = new window.google.maps.Marker({
            map,
            position,
            title: practiceName,
          })

          // Create an info window with the practice name and address
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><strong>${practiceName}</strong><br>${location}</div>`,
          })

          // Open the info window when the marker is clicked
          marker.addListener("click", () => {
            infoWindow.open(map, marker)
          })

          // Open the info window by default
          infoWindow.open(map, marker)
        } else {
          console.error("Geocode was not successful for the following reason:", status)
          setError(true)
        }
        setIsLoading(false)
      })
    } catch (error) {
      console.error("Error initializing Google Maps:", error)
      setError(true)
      setIsLoading(false)
    }
  }

  // Add the global initMap function to the window object
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.initMap = initializeMap
    }

    return () => {
      if (typeof window !== "undefined") {
        window.initMap = undefined
      }
    }
  }, [])

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

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}

// Add TypeScript definitions for the global window object
declare global {
  interface Window {
    initMap: () => void
    google: any
  }
}
