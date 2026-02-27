import { ForgotPasswordForm } from "@/components/forgot-password-form"
import Link from "next/link"

export const metadata = {
  title: "Forgot Password | GPJobs.au",
  description: "Reset your password for GPJobs.au",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-gray-600 mt-2">Enter your email to receive a password reset link</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <ForgotPasswordForm />
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
