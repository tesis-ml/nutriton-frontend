import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2, // Data is fresh for 2 minutes
            retry: 2, // Only retry failed requests twice
            refetchOnWindowFocus: true, // Refetch when window regains focus
        },
    },
});

export default queryClient;