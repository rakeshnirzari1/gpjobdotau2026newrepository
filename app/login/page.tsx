import { LoginForm } from "@/components/login-form"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Log In | GPJobs.au",
  description: "Log in to your GPJobs.au account to manage your practice and job listings.",
}

export default async function LoginPage() {
  // Check if user is already logged in
  const user = await getCurrentUser()
  if (user) {
    // Redirect to appropriate dashboard
    if (user.email === "support@gpvacancy.com.au") {
      redirect("/admin")
    } else {
      redirect("/dashboard")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
