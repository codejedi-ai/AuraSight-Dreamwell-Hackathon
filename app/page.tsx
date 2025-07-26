import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import { MountainIcon } from "lucide-react"
import ContactSection from "@/app/components/contact-section"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] relative z-10">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 xl:pt-48 flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-3">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600"
                  style={{ textShadow: "0 0 8px rgba(139, 92, 246, 0.7)" }}
                >
                  Welcome to AuraSight
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Discover your perfect match in the creator economy. AuraSight connects brands with influencers whose
                  auras align perfectly with their vision.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/signup">
                  <Button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                  </Button>
                </Link>
                <Link href="/match">
                  <Button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card/70 backdrop-blur-md rounded-lg shadow-lg my-12">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                    Unleash the Power of Aura
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    AuraSight uses advanced AI to analyze influencer content, engagement, and audience sentiment to
                    create a unique "aura" profile.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li>
                    <MountainIcon className="mr-2 inline-block h-4 w-4" />
                    Precise influencer matching
                  </li>
                  <li>
                    <MountainIcon className="mr-2 inline-block h-4 w-4" />
                    Real-time aura analytics
                  </li>
                  <li>
                    <MountainIcon className="mr-2 inline-block h-4 w-4" />
                    Campaign optimization
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button>Sign Up Now</Button>
                  </Link>
                  <Link href="/match">
                    <Button variant="outline">Explore Features</Button>
                  </Link>
                </div>
              </div>
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card/70 backdrop-blur-md rounded-lg shadow-lg my-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from brands and influencers who have transformed their collaborations with AuraSight.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <img
                    alt="Avatar"
                    className="rounded-full mb-4"
                    height="80"
                    src="/placeholder-user.jpg"
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                  <CardTitle className="text-foreground">Jane Doe, Marketing Manager</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    "AuraSight revolutionized our influencer campaigns. The insights are unparalleled!"
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <img
                    alt="Avatar"
                    className="rounded-full mb-4"
                    height="80"
                    src="/placeholder-user.jpg"
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                  <CardTitle className="text-foreground">John Smith, Influencer</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    "Finding brands that truly resonate with my audience has never been easier. AuraSight is a
                    game-changer."
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <img
                    alt="Avatar"
                    className="rounded-full mb-4"
                    height="80"
                    src="/placeholder-user.jpg"
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                  <CardTitle className="text-foreground">Emily White, Brand Strategist</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    "The aura matching technology is incredibly accurate. We've seen a significant ROI increase."
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <ContactSection />
      </main>
    </div>
  )
}
