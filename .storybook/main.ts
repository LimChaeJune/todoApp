import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Required
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Optional
  addons: ['@storybook/addon-docs', '@storybook/addon-vitest'],
  staticDirs: ['../public'],
}

export default config
