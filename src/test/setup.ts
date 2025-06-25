import '@testing-library/jest-dom'
/// <reference types="vitest/config" />
/// <reference types="@vitest/browser/matchers" />

export const setup = () => {
  process.env.TZ = 'UTC'
}

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: An update to') &&
      args[0].includes('was not wrapped in act')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
