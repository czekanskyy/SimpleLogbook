import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AuthError } from "next-auth"
import Link from "next/link"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth()
  if (session) {
    redirect("/")
  }

  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Zaloguj się do konta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Lub{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              utwórz nowe konto
            </Link>
          </p>
        </div>
        
        {params?.registered && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Sukces! </strong>
            <span className="block sm:inline">
              Twoje konto zostało utworzone. Poczekaj na zatwierdzenie przez administratora przed zalogowaniem.
            </span>
          </div>
        )}
        
        {params?.error && (
           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Błąd! </strong>
            <span className="block sm:inline">
              {params.error === "CallbackRouteError" 
                ? "Nieprawidłowe dane logowania lub błąd serwera." 
                : "Uwierzytelnianie nie powiodło się."}
            </span>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <form
            action={async (formData) => {
              "use server"
              try {
                await signIn("credentials", { 
                  email: formData.get("email"), 
                  password: formData.get("password"),
                  redirectTo: "/" 
                })
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`/login?error=${error.type}`)
                }
                throw error
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">Adres email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adres email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Hasło</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Hasło"
              />
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
