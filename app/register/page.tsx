import { RegisterForm } from "@/components/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join GPJobs.au today</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <RegisterForm />
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
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
