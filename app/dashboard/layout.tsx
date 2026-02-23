import type React from "react"
import { requireAuth } from "@/lib/auth"
import { DashboardNav } from "@/components/dashboard-nav"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()

  // If user is not a practice, redirect to home
  if (user.user_type !== "practice") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
