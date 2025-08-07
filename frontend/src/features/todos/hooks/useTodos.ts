import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../todoApi';

export const useTodos = (userEmail: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['todos', userEmail, page, limit],
    queryFn: () => getTodos(userEmail, page, limit),
    staleTime: 5 * 1000, // 5 seconds - data stays fresh for 5 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes - cache kept for 2 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: true, // Refetch when connection is restored
    refetchInterval: 60 * 1000, // Auto-refetch every 60 seconds
    refetchIntervalInBackground: false, // Only refetch when tab is active
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
