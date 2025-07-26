import ProfileForm from "./profile-form"
import { getUser } from "@/lib/dal"

export default async function CreateProfilePage() {
  const user = await getUser()

  if (!user) {
    // Handle case where user is not logged in or session expired
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-foreground">Please sign in to create your profile.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Create Your Profile</h1>
      <ProfileForm />
    </div>
  )
}
