const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    // tailwind breakpoints, min: sm, md, lg, xl, 2xl
    deviceSizes: [640, 768, 1024, 1280, 1536]
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.resolve.alias = {
      ...config.resolve.alias
    }
    config.resolve.alias['@Pages'] = path.resolve('./src/pages')
    config.resolve.alias['@Components'] = path.resolve('./src/shared/components')
    config.resolve.alias['@Layouts'] = path.resolve('./src/shared/layouts')
    config.resolve.alias['@Modules'] = path.resolve('./src/modules')
    config.resolve.alias['@Hooks'] = path.resolve('./src/shared/hooks')
    config.resolve.alias['@Models'] = path.resolve('./src/shared/models')
    config.resolve.alias['@Utils'] = path.resolve('./src/lib/utils')
    config.resolve.alias['@Styles'] = path.resolve('./src/styles')
    config.resolve.alias['@Services'] = path.resolve('./src/services')
    config.resolve.alias['@Constants'] = path.resolve('./src/shared/constants')
    config.resolve.alias['@Images'] = path.resolve('./src/assets/images')
    config.resolve.alias['@Icons'] = path.resolve('./src/assets/icons')
    config.resolve.alias['@Types'] = path.resolve('./src/shared/types.ts')
    config.resolve.alias['@Root'] = path.resolve('./')

    return config
  }
}

module.exports = nextConfig
