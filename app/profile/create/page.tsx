"use client"

import { useAuth } from "@/app/auth/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import ProfileForm from "./profile-form"

export default function CreateProfile() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-300 mt-4">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-300 mb-2">Create Your Profile</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Let's build your {user.accountType === "brand" ? "brand" : "creator"} profile to find the perfect
            matches
          </p>
        </div>

        <ProfileForm accountType={user.accountType || "brand"} />
      </div>
    </div>
  )
}
