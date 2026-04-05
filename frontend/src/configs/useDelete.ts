// hooks/query/useDelete.ts
import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import type { UseDeleteParams } from './types/crud.type';

export function useDelete<TResponse = unknown>({
    service,
    invalidateKeys = [],
    onSuccessCallback,
}: UseDeleteParams<TResponse>) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => service(id),
        onSuccess: (data) => {
            invalidateKeys.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: key });
            });

            onSuccessCallback?.(data);
        },
    });
}