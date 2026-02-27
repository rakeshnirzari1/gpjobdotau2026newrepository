"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Briefcase, Settings, LogOut, Plus } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    router.push("/")
    router.refresh()
  }

  const navItems = [
    {
      label: "My Jobs",
      href: "/dashboard",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard",
    },
    {
      label: "Practice Settings",
      href: "/dashboard/practice",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard/practice",
    },
  ]

  return (
    <div className="w-64 bg-gray-100 border-r min-h-screen p-6">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold text-emerald-600">
          GPJobs.au
        </Link>
        <p className="text-sm text-gray-500 mt-1">Practice Dashboard</p>
      </div>

      <div className="mb-6">
        <Link href="/dashboard/jobs/new">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-2 rounded-md ${
              item.active ? "bg-emerald-100 text-emerald-700" : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 w-full text-left"
        >
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </button>
      </nav>
    </div>
  )
}
