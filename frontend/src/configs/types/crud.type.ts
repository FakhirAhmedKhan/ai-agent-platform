import type { QueryKey } from "@tanstack/react-query";

export type UseDeleteParams<TResponse = unknown> = {
    service: (id: string) => Promise<TResponse>;
    invalidateKeys?: QueryKey[];
    onSuccessCallback?: (data: TResponse) => void;
};

export type UsePostParams<TPayload, TResponse> = {
  service: (payload: TPayload) => Promise<TResponse>;
  invalidateKeys?: QueryKey[];
  onSuccessCallback?: (data: TResponse) => void;
};

export type UseReadParams<TResponse, TMapped> = {
    queryKey: QueryKey;
    service: () => Promise<TResponse>;
    mapData?: (data: TResponse) => TMapped;
    enabled?: boolean;
};

export type UpdatePayload<TBody> = {
  id: string;
  payload: TBody;
};

export type UseUpdateParams<TBody, TResponse> = {
  service: (id: string, payload: TBody) => Promise<TResponse>;
  invalidateKeys?: QueryKey[];
  onSuccessCallback?: (data: TResponse) => void;
};