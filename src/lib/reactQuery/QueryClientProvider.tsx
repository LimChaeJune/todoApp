import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
  MutationCache,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.options.mutationKey) {
        queryClient.invalidateQueries({
          queryKey: mutation.options.mutationKey,
        })
      }
    },
  }),
})

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
