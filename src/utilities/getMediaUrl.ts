import { getClientSideURL } from '@/utilities/getURL'

interface MediaResource {
  url?: string | null
  filename?: string | null
  updatedAt?: string | null
}

/**
 * Processes media resource URL to ensure proper formatting
 * @param urlOrResource Either a URL string or a complete media resource object
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (
  urlOrResource: string | null | undefined | MediaResource,
  cacheTag?: string | null,
): string => {
  // Handle resource object case
  if (urlOrResource && typeof urlOrResource === 'object') {
    const resource = urlOrResource as MediaResource

    // Try URL first
    if (resource.url) {
      return getMediaUrl(resource.url, resource.updatedAt || cacheTag)
    }

    // Then try filename with S3 construction
    if (resource.filename) {
      const s3Bucket = process.env.NEXT_PUBLIC_S3_BUCKET || process.env.S3_BUCKET
      const s3Region = process.env.NEXT_PUBLIC_S3_REGION || process.env.S3_REGION

      if (s3Bucket && s3Region) {
        const s3Url = `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/${resource.filename}`
        return cacheTag ? `${s3Url}?${encodeURIComponent(cacheTag)}` : s3Url
      }
    }

    return ''
  }

  // Handle string URL case
  const url = urlOrResource as string
  if (!url) return ''

  // Format cache tag if present
  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
