"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, LogIn, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserType = {
  id: number
  name: string
  email: string
  userType: string
} | null

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<UserType>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          // Add cache: 'no-store' to prevent caching
          cache: "no-store",
          // Add a timestamp to prevent caching
          headers: {
            pragma: "no-cache",
            "cache-control": "no-cache",
            "x-timestamp": Date.now().toString(),
          },
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (res.ok) {
        setUser(null)
        router.push("/")
        router.refresh()
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Determine if the user is an admin
  const isAdmin = user?.email === "support@gpvacancy.com.au"

  // Determine if the user is a practice
  const isPractice = user?.userType === "practice" || user?.user_type === "practice"

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">GPJobs.au</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/for-practices" className="text-gray-700 hover:text-emerald-600 font-medium">
              For Practices
            </Link>
            <Link href="/for-doctors" className="text-gray-700 hover:text-emerald-600 font-medium">
              For Doctors
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-emerald-600 font-medium">
              Pricing
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-emerald-600 font-medium">
              Resources
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 font-medium">
              About
            </Link>

            {isLoading ? (
              <div className="w-24 h-10"></div>
            ) : user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {user.name.split(" ")[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => router.push("/admin")}>Admin Dashboard</DropdownMenuItem>
                    )}
                    {isPractice && (
                      <DropdownMenuItem onClick={() => router.push("/dashboard")}>Dashboard</DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {isPractice && (
                  <Link href="/dashboard/jobs/new">
                    <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                      Post a Job
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="outline" className="flex items-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                      Register
                    </Button>
                  </Link>
                </div>

                <Link href="/register?type=practice">
                  <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                    Post a Job
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/for-practices"
              className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Practices
            </Link>
            <Link
              href="/for-doctors"
              className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Doctors
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {isLoading ? (
              <div className="h-10"></div>
            ) : user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-emerald-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {isPractice && (
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-emerald-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="text-gray-700 hover:text-emerald-600 font-medium py-2 text-left"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-emerald-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
