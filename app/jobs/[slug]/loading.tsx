import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function JobDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/jobs/search" className="flex items-center text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search results
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div>
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>

            <div className="mb-6">
              <Skeleton className="h-7 w-48 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="mb-6">
              <Skeleton className="h-7 w-48 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <Skeleton className="h-7 w-48" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div className="mt-6">
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-7 w-32 mb-4" />
              <Skeleton className="h-64 w-full mb-4 rounded-lg" />
              <Skeleton className="h-5 w-48" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
