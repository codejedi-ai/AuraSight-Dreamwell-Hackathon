import { UserData } from './index'

export interface ProfileData {
  displayName: string
  bio: string
  location: string
  website: string
  accountType: 'brand' | 'influencer'
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

export interface ProfileFormProps {
  userData: UserData
} 