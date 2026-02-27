import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-64 mb-6" />

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <Skeleton className="h-8 w-64 mb-4 mx-auto" />
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-8 w-32 mb-4" />

          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>

              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <div className="space-y-2">
                  {Array(7)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
