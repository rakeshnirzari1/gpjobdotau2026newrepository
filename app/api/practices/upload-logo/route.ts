import { type NextRequest, NextResponse } from "next/server"
import { uploadLogo } from "@/lib/blob"
import { requirePractice } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated as a practice
    const user = await requirePractice()

    const formData = await request.formData()
    const file = formData.get("logo") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const logoUrl = await uploadLogo(file)

    return NextResponse.json({ logoUrl })
  } catch (error) {
    console.error("Logo upload error:", error)
    return NextResponse.json({ error: "Failed to upload logo" }, { status: 500 })
  }
}
