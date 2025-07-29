"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Amplify } from 'aws-amplify'
import { signUp } from '@aws-amplify/auth'
import { createUser } from '@/lib/data-client'
import outputs from '@/amplify_outputs.json'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Configure Amplify with the outputs
Amplify.configure(outputs);

function SignUpClientForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Get pre-filled data from URL params
  const firstName = searchParams.get("firstName") || ""
  const lastName = searchParams.get("lastName") || ""
  const email = searchParams.get("email") || ""
  const accountType = searchParams.get("accountType") || ""

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError("")
    setSuccess("")
    
    const formFirstName = formData.get("firstName") as string
    const formLastName = formData.get("lastName") as string
    const formEmail = formData.get("email") as string
    const formPassword = formData.get("password") as string
    const formConfirmPassword = formData.get("confirmPassword") as string
    const formAccountType = formData.get("accountType") as string

    // Validation
    if (!formFirstName || !formLastName || !formEmail || !formPassword || !formConfirmPassword || !formAccountType) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    if (formPassword !== formConfirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    if (formPassword.length < 8) {
      setError("Password must be at least 8 characters")
      setLoading(false)
      return
    }

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: formEmail,
        password: formPassword,
        options: {
          userAttributes: {
            email: formEmail,
            given_name: formFirstName,
            family_name: formLastName,
            'custom:accountType': formAccountType,
          },
        },
      });

      if (isSignUpComplete) {
        // Create user record in our database
        await createUser({
          email: formEmail,
          firstName: formFirstName,
          lastName: formLastName,
          accountType: formAccountType as 'influencer' | 'brand',
        });

        setSuccess("Account created successfully! Please check your email to confirm your account before signing in.")
        setTimeout(() => {
          router.push("/auth/signin")
        }, 3000)
      } else if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setSuccess("Account created successfully! Please check your email to confirm your account before signing in.")
        setTimeout(() => {
          router.push("/auth/signin")
        }, 3000)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8 bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">Create an account</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link className="font-medium text-primary hover:text-primary/80" href="/auth/signin">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="p-4 rounded-md bg-red-900 border border-red-600 text-red-200">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-4 rounded-md bg-green-900 border border-green-600 text-green-200">
            {success}
          </div>
        )}
        
        <form className="space-y-6" action={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="sr-only">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="First Name"
                defaultValue={firstName}
                className="relative block w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="sr-only">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Last Name"
                defaultValue={lastName}
                className="relative block w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
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
            <Label htmlFor="accountType" className="sr-only">
              Account Type
            </Label>
            <Select name="accountType" required defaultValue={accountType}>
              <SelectTrigger className="relative block w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="influencer">Influencer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Password"
              className="relative block w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirm Password"
              className="relative block w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SignUpClientPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <SignUpClientForm />
    </Suspense>
  )
} 