"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"

interface LogoUploadProps {
  initialLogo?: string
  onLogoChange: (logoUrl: string | null) => void
}

export function LogoUpload({ initialLogo, onLogoChange }: LogoUploadProps) {
  const [logo, setLogo] = useState<string | null>(initialLogo || null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("logo", file)

      const response = await fetch("/api/practices/upload-logo", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload logo")
      }

      setLogo(data.logoUrl)
      onLogoChange(data.logoUrl)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveLogo = () => {
    setLogo(null)
    onLogoChange(null)
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}

      {logo ? (
        <div className="relative">
          <div className="relative h-32 w-32 rounded-md overflow-hidden border border-gray-200">
            <Image src={logo || "/placeholder.svg"} alt="Practice logo" fill className="object-contain" sizes="128px" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
            onClick={handleRemoveLogo}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove logo</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 w-32 rounded-md border-2 border-dashed border-gray-300 bg-gray-50">
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
        </div>
      )}

      {!isUploading && !logo && (
        <div>
          <input id="logo-upload" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
          <label htmlFor="logo-upload">
            <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
              <span>Upload Logo</span>
            </Button>
          </label>
        </div>
      )}
    </div>
  )
}
