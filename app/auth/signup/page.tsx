"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/app/auth/AuthContext"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const { signUp, loading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountType: "brand" as 'brand' | 'influencer',
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  })
  const [localError, setLocalError] = useState("")
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setLocalError("")

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match")
      return
    }

    if (!formData.agreeToTerms) {
      setLocalError("You must agree to the terms and conditions")
      return
    }

    try {
      await signUp(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName, 
        formData.accountType
      )
      setNeedsConfirmation(true)
    } catch (err) {
      // Error is handled by AuthContext
    }
  }

  if (needsConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-12">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-gray-300 mb-6">We've sent a confirmation code to your email address.</p>
            <p className="text-gray-400 text-sm mb-8">Please check your email and click the confirmation link to complete your registration.</p>
            <div className="space-y-4">
              <Link
                href="/auth/signin"
                className="block w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Join AuraSight</h2>
          <p className="text-gray-300">Create your account and start connecting</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          {(error || localError) && (
            <div className="bg-red-900 border border-red-600 text-red-200 p-4 mb-6 rounded-md">
              {error || localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-300 mb-2">
                Account Type
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                required
              >
                <option value="brand">Brand/Company</option>
                <option value="influencer">Influencer/Creator</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-300">
                I agree to the{" "}
                <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
