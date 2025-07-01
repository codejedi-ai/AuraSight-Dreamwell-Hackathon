export interface UserData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  accountType?: 'brand' | 'influencer'
  displayName?: string
  bio?: string
  location?: string
  website?: string
  companyName?: string
  industry?: string
  companySize?: string
  brandValues?: string[]
  missionStatement?: string
  targetAudience?: string
  platforms?: string[]
  followerCount?: string
  contentCategories?: string[]
  personalValues?: string[]
  contentStyle?: string
  audienceAge?: string
  audienceGender?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface FormData {
  brand: string
  influencer: string
  brandValues: string[]
  missionStatement: string
  targetEmotion: string
}

export interface InfluencerMatch {
  name: string
  platform: string
  followers: string
  engagement: string
  niche: string
  details: string
  values: string[]
  vibeScore: number
  audienceAlignment: number
  contentStyle: string
} 