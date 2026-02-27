import { AdminPracticeForm } from "@/components/admin-practice-form"
import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

async function getPractice(id: string) {
  const practices = await sql`
    SELECT p.*, u.email, u.name as user_name
    FROM practices p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ${id}
  `
  return practices.length > 0 ? practices[0] : null
}

export default async function AdminEditPractice({ params }: { params: { id: string } }) {
  const practice = await getPractice(params.id)

  if (!practice) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/practices" className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to practices
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Practice</h1>
        <p className="text-gray-600 mt-2">
          Editing {practice.practice_name} (Owner: {practice.user_name})
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <AdminPracticeForm practice={practice} />
      </div>
    </div>
  )
}
