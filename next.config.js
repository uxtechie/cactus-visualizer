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
    config.resolve.alias['@Pages'] = path.join(__dirname, './src/pages')
    config.resolve.alias['@Components'] = path.join(__dirname, './src/shared/components')
    config.resolve.alias['@Layouts'] = path.join(__dirname, './src/shared/layouts')
    config.resolve.alias['@Modules'] = path.join(__dirname, './src/modules')
    config.resolve.alias['@Hooks'] = path.join(__dirname, './src/shared/hooks')
    config.resolve.alias['@Models'] = path.join(__dirname, './src/shared/models')
    config.resolve.alias['@Utils'] = path.join(__dirname, './src/lib/utils')
    config.resolve.alias['@Styles'] = path.join(__dirname, './src/styles')
    config.resolve.alias['@Services'] = path.join(__dirname, './src/services')
    config.resolve.alias['@Constants'] = path.join(__dirname, './src/shared/constants')
    config.resolve.alias['@Images'] = path.join(__dirname, './src/assets/images')
    config.resolve.alias['@Icons'] = path.join(__dirname, './src/assets/icons')
    config.resolve.alias['@Types'] = path.join(__dirname, './src/shared/types.ts')
    config.resolve.alias['@'] = path.join(__dirname, './')

    return config
  }
}

module.exports = nextConfig
