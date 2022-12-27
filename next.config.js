/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/sched',
        destination: '/ministries/praise/schedule',
        permanent: true,
      },
      {
        source: '/schedule',
        destination: '/ministries/praise/schedule',
        permanent: true,
      },
      {
        source: '/ps',
        destination: '/ministries/praise/schedule',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
