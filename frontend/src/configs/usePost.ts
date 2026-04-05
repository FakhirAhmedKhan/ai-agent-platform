// hooks/query/usePost.ts
import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import type { UsePostParams } from './types/crud.type';

export function usePost<TPayload, TResponse>({
  service,
  invalidateKeys = [],
  onSuccessCallback,
}: UsePostParams<TPayload, TResponse>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: service,
    onSuccess: (data) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      onSuccessCallback?.(data);
    },
  });
}