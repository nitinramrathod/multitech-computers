/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
    CONTACT_EMAIL: 'rathod173ram@gmail.com',
  },
}

export default nextConfig
