'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './getQueryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default Providers
