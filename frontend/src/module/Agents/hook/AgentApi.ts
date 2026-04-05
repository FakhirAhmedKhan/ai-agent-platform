import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "../../../configs/app.config";
import { useAuth } from "../../Auth/hooks/useAuth";

export const useAgentApi = () => {
    const queryClient = useQueryClient();

    const getAgents = async () => {
        const { data } = await api.get(endpoints.agents);
        return data;
    };

    const createAgent = async (payload: any) => {
        const { data } = await api.post(endpoints.agentsCreate, payload);
        return data;
    };

    const deleteAgent = async (id: string) => {
        const { data } = await api.delete(endpoints.agentsDelete(id));
        return data;
    };

    const { isAuthenticated } = useAuth();

    const { data: agents = [], isLoading, error, refetch } = useQuery({
        queryKey: ["agents"],
        queryFn: getAgents,
        enabled: isAuthenticated,
    });

    const createMutation = useMutation({
        mutationFn: createAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agents"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agents"] });
        },
    });

    return {
        agents,
        isLoading,
        error,
        refetch,
        createAgent: createMutation.mutateAsync,
        deleteAgent: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};