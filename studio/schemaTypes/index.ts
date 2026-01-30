import {storeHours} from './storeHours'
import {testimonial} from './testimonial'
import {siteSettings} from './siteSettings'
import {signatureItem} from './signatureItem'

export const schemaTypes = [
  // Singleton documents
  siteSettings,
  storeHours,

  // Collections
  testimonial,
  signatureItem,
]
