import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

// Build S3 hostname from env vars (e.g. "my-bucket.s3.us-east-1.amazonaws.com")
const S3_BUCKET = process.env.S3_BUCKET || process.env.NEXT_PUBLIC_S3_BUCKET || ''
const S3_REGION = process.env.S3_REGION || process.env.NEXT_PUBLIC_S3_REGION || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // S3 bucket pattern — works for both path-style and virtual-hosted style
      ...(S3_BUCKET && S3_REGION
        ? [
            {
              hostname: `${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`,
              protocol: 'https',
            },
            {
              hostname: `s3.${S3_REGION}.amazonaws.com`,
              protocol: 'https',
            },
          ]
        : []),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
