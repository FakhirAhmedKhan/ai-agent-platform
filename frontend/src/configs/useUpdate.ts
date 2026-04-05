// hooks/query/useUpdate.ts
import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import type { UseUpdateParams, UpdatePayload } from './types/crud.type';

export function useUpdate<TBody, TResponse>({
  service,
  invalidateKeys = [],
  onSuccessCallback,
}: UseUpdateParams<TBody, TResponse>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePayload<TBody>) => service(id, payload),
    onSuccess: (data) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      onSuccessCallback?.(data);
    },
  });
}