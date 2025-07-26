"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/auth/AuthContext"
import { createProfile } from "@/lib/data-client"
import type { ProfileData, ProfileFormProps } from "@/types/profile"

export default function ProfileForm({ accountType }: ProfileFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState<ProfileData>({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    accountType,
    companyName: "",
    industry: "",
    companySize: "",
    brandValues: [],
    missionStatement: "",
    targetAudience: "",
    platforms: [],
    followerCount: "",
    contentCategories: [],
    personalValues: [],
    contentStyle: "",
    audienceAge: "",
    audienceGender: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (
    field: keyof ProfileData,
    value: string
  ) => {
    const items = value.split(",").map((item) => item.trim()).filter(Boolean)
    setFormData((prev) => ({ ...prev, [field]: items }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError("You must be logged in to create a profile")
      return
    }

    setLoading(true)
    setError("")

    try {
      await createProfile({
        userId: user.id,
        ...formData,
      })
      router.push("/profile")
    } catch (err: any) {
      console.error("Error creating profile:", err)
      setError(err.message || "Failed to create profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Create Your {accountType === "brand" ? "Brand" : "Influencer"} Profile
        </h2>

        {error && (
          <div className="bg-red-900 border border-red-600 text-red-200 p-4 mb-6 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="Your display name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          {/* Account Type Specific Fields */}
          {accountType === "brand" ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                Brand Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                    placeholder="e.g., Technology, Fashion, Food"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brand Values (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.brandValues.join(", ")}
                  onChange={(e) => handleArrayInputChange("brandValues", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="Sustainability, Innovation, Quality"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mission Statement
                </label>
                <textarea
                  name="missionStatement"
                  value={formData.missionStatement}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="What is your brand's mission?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="e.g., Young professionals aged 25-35"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                Influencer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Platforms (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.platforms.join(", ")}
                    onChange={(e) => handleArrayInputChange("platforms", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                    placeholder="Instagram, TikTok, YouTube"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Follower Count
                  </label>
                  <input
                    type="text"
                    name="followerCount"
                    value={formData.followerCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                    placeholder="e.g., 50K, 100K-500K"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content Categories (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.contentCategories.join(", ")}
                  onChange={(e) => handleArrayInputChange("contentCategories", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="Lifestyle, Fashion, Travel, Food"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Personal Values (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.personalValues.join(", ")}
                  onChange={(e) => handleArrayInputChange("personalValues", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  placeholder="Authenticity, Creativity, Positivity"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content Style
                  </label>
                  <select
                    name="contentStyle"
                    value={formData.contentStyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  >
                    <option value="">Select style</option>
                    <option value="casual">Casual</option>
                    <option value="professional">Professional</option>
                    <option value="humorous">Humorous</option>
                    <option value="educational">Educational</option>
                    <option value="inspirational">Inspirational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Audience Age
                  </label>
                  <select
                    name="audienceAge"
                    value={formData.audienceAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  >
                    <option value="">Select age range</option>
                    <option value="13-17">13-17</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45+">45+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Audience Gender
                  </label>
                  <select
                    name="audienceGender"
                    value={formData.audienceGender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                  >
                    <option value="">Select gender</option>
                    <option value="mostly-female">Mostly Female</option>
                    <option value="mostly-male">Mostly Male</option>
                    <option value="balanced">Balanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Profile..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
