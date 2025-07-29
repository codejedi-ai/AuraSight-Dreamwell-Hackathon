"use client"
import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Amplify } from 'aws-amplify'
import { signIn } from '@aws-amplify/auth'
import outputs from '@/amplify_outputs.json'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Configure Amplify with the outputs
Amplify.configure(outputs);

function SignInClientForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Get pre-filled email from URL params
  const email = searchParams.get("email") || ""

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError("")
    
    const formEmail = formData.get("email") as string
    const formPassword = formData.get("password") as string

    if (!formEmail || !formPassword) {
      setError("Email and password are required")
      setLoading(false)
      return
    }

    try {
      const { isSignedIn, nextStep } = await signIn({ username: formEmail, password: formPassword });
      
      if (isSignedIn) {
        router.push("/profile/create");
      } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        setError("Please check your email and confirm your account before signing in.")
      } else {
        setError("Invalid email or password.")
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      setError(error.message || "Failed to sign in. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8 bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link className="font-medium text-primary hover:text-primary/80" href="/auth/signup">
              create a new account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="p-4 rounded-md bg-red-900 border border-red-600 text-red-200">
            {error}
          </div>
        )}
        
        <form className="space-y-6" action={handleSubmit}>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              defaultValue={email}
              className="relative block w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              className="relative block w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SignInClientPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <SignInClientForm />
    </Suspense>
  )
} 