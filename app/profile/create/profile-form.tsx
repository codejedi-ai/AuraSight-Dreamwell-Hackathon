"use client"
import { useState } from "react"
import { createProfile } from "@/app/actions/profile"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/app/auth/AuthContext"

interface UserData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  accountType?: string
}

interface ProfileFormProps {
  userData: UserData
}

interface ProfileData {
  displayName: string
  bio: string
  location: string
  website: string
  accountType: string
  companyName: string
  industry: string
  companySize: string
  brandValues: string[]
  missionStatement: string
  targetAudience: string
  platforms: string[]
  followerCount: string
  contentCategories: string[]
  personalValues: string[]
  contentStyle: string
  audienceAge: string
  audienceGender: string
}

export default function ProfileForm() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError("")
    setSuccess("")
    
    try {
      const result = await createProfile(null, formData)
      if (result?.errors) {
        const errorMessages = Object.values(result.errors).flat()
        setError(errorMessages.join(", "))
      } else {
        setSuccess("Profile created successfully!")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while creating profile")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Authentication Required</h2>
          <p className="text-muted-foreground">Please sign in to create your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <input type="hidden" name="userId" value={user.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-muted-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  defaultValue={user.firstName || ""}
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-muted-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  defaultValue={user.lastName || ""}
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                defaultValue={user.email || ""}
                disabled
                className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-muted-foreground">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                className="min-h-[100px] bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="accountType" className="text-muted-foreground">
                Account Type
              </Label>
              <Input
                id="accountType"
                name="accountType"
                placeholder="e.g., Influencer, Brand"
                defaultValue={user.accountType || ""}
                className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
            {success && <p className="text-green-500 text-center mt-4">{success}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
