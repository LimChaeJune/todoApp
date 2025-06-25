import '@testing-library/jest-dom'
/// <reference types="vitest/config" />
/// <reference types="@vitest/browser/matchers" />

export const setup = () => {
  process.env.TZ = 'UTC'
}
