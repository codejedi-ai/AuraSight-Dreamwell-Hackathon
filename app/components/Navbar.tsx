import Link from "next/link"
import Image from "next/image"
import { getSession } from "@/lib/auth"
import { signOut } from "@/app/actions/auth"

export default async function Navbar() {
  const session = await getSession()

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="AuraSight" width={36} height={36} className="rounded-lg" priority />
            <Link href="/" className="font-bold text-lg text-purple-700 dark:text-purple-300">
              AuraSight
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/#philosophy"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300"
            >
              Philosophy
            </Link>
            <Link
              href="/#mission"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300"
            >
              Our Mission
            </Link>
            <Link
              href="/#contact"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300"
            >
              Contact
            </Link>
          </nav>

          {/* Action Button */}
          <div className="flex items-center space-x-4">
            {session?.userId ? (
              <>
                <span className="text-gray-300 text-sm">Welcome, {session.firstName || session.email}</span>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
