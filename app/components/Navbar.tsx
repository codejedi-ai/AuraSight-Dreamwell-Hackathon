"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenu } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/app/auth/AuthContext"
import { signOut } from "@/app/actions/auth"

export default function Navbar() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container h-16 flex items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" href="/">
          <Image src="/logo.png" alt="AuraSight Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-semibold text-foreground">AuraSight</span>
        </Link>
        <nav className="hidden md:flex gap-6">

          {user && (
            <Link
              className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
              href="/profile/create"
            >
              Profile
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/placeholder-user.jpg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile/create">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <form action={signOut}>
                    <Button type="submit" variant="ghost" className="w-full justify-start p-0 h-auto">
                      Sign Out
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
