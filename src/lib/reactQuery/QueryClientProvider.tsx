import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

type Props = PropsWithChildren & {
  initialIsOpenDevtools?: boolean
}

const QueryClientProvider = ({
  initialIsOpenDevtools = true,
  children,
}: Props) => {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={initialIsOpenDevtools} />
      {children}
    </TanstackQueryClientProvider>
  )
}

export default QueryClientProvider
