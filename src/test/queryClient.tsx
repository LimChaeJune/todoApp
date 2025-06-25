import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StoryFn } from '@storybook/react'

interface QueryClientOptions {
  retry?: boolean
  staleTime?: number
  cacheTime?: number
}

export const createTestQueryClient = (options: QueryClientOptions = {}) => {
  const { retry = false, staleTime = 0, cacheTime = 0 } = options

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry,
        staleTime,
        gcTime: cacheTime,
      },
      mutations: {
        retry,
      },
    },
  })
}

interface QueryWrapperProps {
  children: ReactNode
  queryClient?: QueryClient
  queryClientOptions?: QueryClientOptions
}

export const QueryWrapper = ({
  children,
  queryClient,
  queryClientOptions,
}: QueryWrapperProps): ReactElement => {
  const client = queryClient || createTestQueryClient(queryClientOptions)

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
  queryClientOptions?: QueryClientOptions
}

export const renderWithQuery = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult => {
  const { queryClient, queryClientOptions, ...renderOptions } = options

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryWrapper
      queryClient={queryClient}
      queryClientOptions={queryClientOptions}
    >
      {children}
    </QueryWrapper>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// 스토리북 데코레이터용
export const withQueryClient = (options: QueryClientOptions = {}) => {
  return (Story: StoryFn) => {
    const queryClient = createTestQueryClient(options)
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  }
}
