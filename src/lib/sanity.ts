import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qixklz0q',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production, fresh data in dev
})

// Helper for generating image URLs
const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Type definitions for Sanity documents
export interface SanityTestimonial {
  _id: string
  name: string
  role?: string
  rating: number
  review: string
  initials?: string
  avatar?: SanityImageSource
  featured?: boolean
  order?: number
}

export interface SanityStoreHours {
  _id: string
  hours: Array<{
    day: string
    hours: string
  }>
  timezone: string
}

export interface SanitySiteSettings {
  _id: string
  title?: string
  menuPdf?: {
    asset: {
      _ref: string
      url: string
    }
  }
  menuLastUpdated?: string
  heroImage?: SanityImageSource
  contactEmail?: string
  contactPhone?: string
  address?: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
}

export interface SanitySignatureItem {
  _id: string
  name: string
  description: string
  image: SanityImageSource
  badge?: string
  order: number
  featured?: boolean
}

// Query functions
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return sanityClient.fetch(
    `*[_type == "testimonial" && featured == true] | order(order asc) {
      _id,
      name,
      role,
      rating,
      review,
      initials,
      avatar,
      featured,
      order
    }`
  )
}

export async function getStoreHours(): Promise<SanityStoreHours | null> {
  return sanityClient.fetch(
    `*[_type == "storeHours"][0] {
      _id,
      hours,
      timezone
    }`
  )
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      _id,
      title,
      "menuPdf": menuPdf.asset->{_ref, url},
      menuLastUpdated,
      heroImage,
      contactEmail,
      contactPhone,
      address,
      socialLinks
    }`
  )
}

export async function getSignatureItems(): Promise<SanitySignatureItem[]> {
  return sanityClient.fetch(
    `*[_type == "signatureItem" && featured == true] | order(order asc) {
      _id,
      name,
      description,
      image,
      badge,
      order,
      featured
    }`
  )
}

export async function getMenuPdfUrl(): Promise<string | null> {
  const settings = await sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      "menuUrl": menuPdf.asset->url
    }`
  )
  return settings?.menuUrl || null
}
