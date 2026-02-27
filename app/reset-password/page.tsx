import { ResetPasswordForm } from "@/components/reset-password-form"
import Link from "next/link"

export const metadata = {
  title: "Reset Password | GPJobs.au",
  description: "Create a new password for your GPJobs.au account",
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams.token || ""

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-gray-600 mt-2">Create a new password for your account</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <ResetPasswordForm token={token} />
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
