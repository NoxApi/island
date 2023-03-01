/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/noxtestbucket/**',
      },     
    ],
      domains: ["storage.googleapis.com"],
  },
}