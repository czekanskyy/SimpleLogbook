import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function PendingPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  if (session.user?.isApproved) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Account Pending Approval
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your account has been created successfully but requires administrator approval before you can access the logbook.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            You will be notified once your account is active.
          </p>
        </div>
        <div className="mt-6">
          <a 
            href="/api/auth/signout" 
            className="text-red-600 hover:text-red-500 font-medium"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  )
}
