import type React from "react"
import { requireAdmin } from "@/lib/auth"
import { AdminNav } from "@/components/admin-nav"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin()
  } catch (error) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
