import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/app/components/Navbar"
import VantaNetBackground from "@/app/components/vanta-net-background" // Updated import
import { AuthProvider } from "./auth/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AuraSight",
  description: "Connecting brands and influencers",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <VantaNetBackground /> {/* Using the new Net background */}
          <div className="relative z-10 min-h-screen bg-background/70 backdrop-blur-sm">
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
