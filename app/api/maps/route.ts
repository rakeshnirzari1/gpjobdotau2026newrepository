import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const callback = searchParams.get("callback") || "initMap"

  // Get the API key from environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Maps API key not configured" }, { status: 500 })
  }

  // Create the Google Maps script URL with the API key
  // Using the recommended loading pattern with callback
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callback}&libraries=places,geocoding&v=weekly&loading=async`

  return NextResponse.json({ url: mapUrl })
}
