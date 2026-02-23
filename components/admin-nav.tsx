"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Briefcase, Building, Settings } from "lucide-react"

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Practices",
      href: "/admin/practices",
      icon: <Building className="h-5 w-5" />,
    },
    {
      name: "Jobs",
      href: "/admin/jobs",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className={cn(
            "justify-start px-4 py-2 h-auto",
            pathname === item.href
              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          )}
          asChild
        >
          <Link href={item.href}>
            <span className="flex items-center">
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </span>
          </Link>
        </Button>
      ))}
    </nav>
  )
}
