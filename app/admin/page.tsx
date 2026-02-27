import { requireAdmin } from "@/lib/auth"
import { sql } from "@/lib/db"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  // Ensure only admin can access this page
  const user = await requireAdmin()

  // Get counts for dashboard - using COUNT(*) instead of COUNT() to avoid errors
  const practicesCount = await sql`SELECT COUNT(*) as count FROM practices`
  const jobsCount = await sql`SELECT COUNT(*) as count FROM jobs`
  const pendingJobsCount = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_paid = false`
  const usersCount = await sql`SELECT COUNT(*) as count FROM users`

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{practicesCount[0].count}</CardTitle>
            <CardDescription>Total Practices</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/practices">
              <Button variant="outline" className="w-full">
                View All Practices
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{jobsCount[0].count}</CardTitle>
            <CardDescription>Total Jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/jobs">
              <Button variant="outline" className="w-full">
                View All Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{pendingJobsCount[0].count}</CardTitle>
            <CardDescription>Unpaid Jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/jobs?filter=unpaid">
              <Button variant="outline" className="w-full">
                View Unpaid Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{usersCount[0].count}</CardTitle>
            <CardDescription>Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full">
                View All Users
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Recently posted jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/jobs">
              <Button variant="default" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Manage Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Practices</CardTitle>
            <CardDescription>Recently registered practices</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/practices">
              <Button variant="default" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Manage Practices
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
