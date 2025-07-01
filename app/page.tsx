import Link from "next/link"
import ContactSection from "@/app/components/contact-section"
import type { JSX } from "react"

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
                Welcome to AuraSight
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                The ultimate influencer aura management platform. Track vibes, analyze brand resonance, and discover the
                perfect energy for your marketing campaigns.
              </p>
            </div>
            <div className="space-x-4 mt-6">
              <Link
                href="/match"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-10 text-lg font-medium text-white shadow transition-colors hover:from-purple-700 hover:to-indigo-700"
              >
                Start Matching Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
            Our Philosophy
          </h2>
          <div className="prose lg:prose-xl mx-auto text-gray-300 text-center">
            <p className="text-lg leading-relaxed mb-6">
              At AuraSight, we believe that the essence of connection lies in synergy—where the vibrant energy of an
              influencer's unique "vibe" meets the grounded strength of a brand's "identity."
            </p>
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-inner my-8">
              <blockquote className="italic text-gray-300 border-l-4 border-purple-500 pl-4 text-left">
                "The relationship between an influencer's vibe and a brand's identity is like the interplay of light and
                photons... Together, they form an inseparable bond, one amplifying the other."
              </blockquote>
            </div>
            <p className="text-lg leading-relaxed">
              AuraSight seeks to capture this harmony, connecting the expressive energy of influencers with the
              intentional vision of brands.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
            Our Mission
          </h2>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-400">Creating Meaningful Connections</h3>
            <p className="text-lg text-gray-300 mb-6 text-center">
              AuraSight connects the expressive energy of influencers with the intentional vision of brands.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              <div className="bg-purple-900/50 p-5 rounded-lg text-center">
                <div className="text-purple-400 text-4xl mb-3">🔍</div>
                <h4 className="font-semibold text-lg mb-2 text-white">Discover</h4>
                <p className="text-gray-400">Find the perfect match based on authentic alignment.</p>
              </div>
              <div className="bg-indigo-900/50 p-5 rounded-lg text-center">
                <div className="text-indigo-400 text-4xl mb-3">🤝</div>
                <h4 className="font-semibold text-lg mb-2 text-white">Connect</h4>
                <p className="text-gray-400">Build relationships that go beyond transactions.</p>
              </div>
              <div className="bg-blue-900/50 p-5 rounded-lg text-center">
                <div className="text-blue-400 text-4xl mb-3">✨</div>
                <h4 className="font-semibold text-lg mb-2 text-white">Transform</h4>
                <p className="text-gray-400">Create content that resonates deeply with audiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
            Contact Us
          </h2>
          <ContactSection />
        </div>
      </section>
    </div>
  )
}
