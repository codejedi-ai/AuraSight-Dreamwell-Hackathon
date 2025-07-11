"use client"

import type React from "react"
import { useState, type FormEvent } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    isInfluencer: false,
    isBrand: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      console.log("Submitting form data:", formData)

      // In a real app, you would have an API endpoint for this.
      // For now, we simulate a network request.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      })
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        isInfluencer: false,
        isBrand: false,
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "Failed to submit form",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
      <p className="text-lg text-gray-300 mb-8 text-center">
        Ready to discover the perfect match for your brand or showcase your unique influencer vibe? Get in touch with
        our team today.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {submitStatus && (
          <div
            className={`p-4 rounded-md ${submitStatus.success ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"}`}
          >
            <p>{submitStatus.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
            placeholder="What is this regarding?"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
            placeholder="Tell us more about your needs..."
            required
          ></textarea>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isInfluencer"
              checked={formData.isInfluencer}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
            />
            <span className="ml-2 text-sm text-gray-300">I&apos;m an influencer looking to connect with brands</span>
          </label>

          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              name="isBrand"
              checked={formData.isBrand}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
            />
            <span className="ml-2 text-sm text-gray-300">I represent a brand looking for influencers</span>
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  )
}
