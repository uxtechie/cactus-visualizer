import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@Pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@Components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@Layouts/(.*)$': '<rootDir>/src/shared/layouts/$1',
    '^@Modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@Hooks/(.*)$': '<rootDir>/src/shared/hooks/$1',
    '^@Models/(.*)$': '<rootDir>/src/shared/models/$1',
    '^@Utils/(.*)$': '<rootDir>/src/lib/utils/$1',
    '^@Styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@Services/(.*)$': '<rootDir>/src/services/$1',
    '^@Constants/(.*)$': '<rootDir>/src/shared/constants/$1',
    '^@Images/(.*)$': '<rootDir>/src/assets/images/$1',
    '^@Icons/(.*)$': '<rootDir>/src/assets/icons/$1',
    '^@Types': '<rootDir>/src/shared/types.ts',
    '^@/(.*)$': '<rootDir>/$1'
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
