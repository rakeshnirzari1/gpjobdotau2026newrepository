import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadLogo(file: File) {
  try {
    // Generate a unique filename with original extension
    const extension = file.name.split(".").pop()
    const filename = `practice-logos/${nanoid()}.${extension}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    })

    return blob.url
  } catch (error) {
    console.error("Error uploading logo:", error)
    throw new Error("Failed to upload logo")
  }
}
