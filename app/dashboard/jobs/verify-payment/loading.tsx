import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-16 w-16 text-emerald-600 animate-spin mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
      <p className="text-gray-500 mt-2">Verifying payment status</p>
    </div>
  )
}
