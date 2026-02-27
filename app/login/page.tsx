import { LoginForm } from "@/components/login-form"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Log In | GPJob.au",
  description: "Log in to your GPJob.au account to manage your practice and job listings.",
}

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) {
    if (user.email === "support@gpvacancy.com.au") {
      redirect("/admin")
    } else {
      redirect("/dashboard")
    }
  }

  return (
    <div className="bg-background min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  )
}
