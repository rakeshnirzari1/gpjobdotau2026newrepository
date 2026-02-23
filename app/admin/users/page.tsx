import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sql } from "@/lib/db"
import Link from "next/link"
import { User, Mail, Calendar, Building } from "lucide-react"
import { formatDistance } from "date-fns"

async function getUsers() {
  const users = await sql`
    SELECT u.*, 
    (SELECT COUNT(*) FROM practices WHERE user_id = u.id) as practice_count
    FROM users u
    ORDER BY u.created_at DESC
  `
  return users
}

export default async function AdminUsers() {
  const users = await getUsers()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Users</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {users.map((user: any) => (
          <Card key={user.id} className="hover:shadow-sm transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Badge
                    variant={user.user_type === "practice" ? "default" : "outline"}
                    className={user.user_type === "practice" ? "bg-emerald-600" : ""}
                  >
                    {user.user_type === "practice" ? "Practice" : user.user_type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Registered {formatDistance(new Date(user.created_at), new Date(), { addSuffix: true })}</span>
                </div>
                {user.practice_count > 0 && (
                  <div className="flex items-center text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    <span>
                      {user.practice_count} {user.practice_count === 1 ? "practice" : "practices"}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              {user.practice_count > 0 && (
                <Link href={`/admin/users/${user.id}/practices`}>
                  <Button variant="outline">View Practices</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
