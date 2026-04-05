import { useQuery, type QueryKey } from '@tanstack/react-query';
import type { UseReadParams } from './types/crud.type';

export function useRead<TResponse, TMapped = TResponse>({
    queryKey,
    service,
    mapData,
    enabled = true,
}: UseReadParams<TResponse, TMapped>) {
    return useQuery({
        queryKey,
        queryFn: service,
        enabled,
        select: (data) => (mapData ? mapData(data) : (data)),
    });
}