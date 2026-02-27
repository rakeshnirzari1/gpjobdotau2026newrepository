"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Building, Briefcase, Users, LogOut, LayoutDashboard } from "lucide-react"

export function AdminNav() {
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
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      active: pathname === "/admin",
    },
    {
      label: "Practices",
      href: "/admin/practices",
      icon: <Building className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/practices" || pathname.startsWith("/admin/practices/"),
    },
    {
      label: "Jobs",
      href: "/admin/jobs",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/jobs" || pathname.startsWith("/admin/jobs/"),
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: <Users className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/users" || pathname.startsWith("/admin/users/"),
    },
  ]

  return (
    <div className="w-64 bg-gray-100 border-r min-h-screen p-6">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold text-emerald-600">
          GPJobs.au
        </Link>
        <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
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
