import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../Auth/hooks/useAuth";
import { getTasks, createTask, runTask, stopTask } from './Task.service';
import { mapTasks } from './tasks.mapper';

export const useTasksApi = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    const fetchTasks = async () => {
        const tasksData = await getTasks();
        return mapTasks(tasksData);
    };

    const { data: tasks = [], isLoading, error: queryError, refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchTasks,
        enabled: isAuthenticated,
    });

    const createMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const runMutation = useMutation({
        mutationFn: runTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const stopMutation = useMutation({
        mutationFn: stopTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const mutateCreate = useCallback(async (payload: any) => {
        return createMutation.mutateAsync(payload);
    }, [createMutation]);

    const mutateRun = useCallback(async (taskId: string) => {
        return runMutation.mutateAsync(taskId);
    }, [runMutation]);

    const mutateStop = useCallback(async (taskId: string) => {
        return stopMutation.mutateAsync(taskId);
    }, [stopMutation]);

    return {
        tasks,
        isLoading,
        isCreating: createMutation.isPending,
        isRunning: runMutation.isPending,
        error: (queryError as any)?.message || null,
        refetch,
        mutateCreate,
        mutateRun,
        mutateStop,
    };
};

export const useTaskList = () => {
    const { tasks, isLoading, error, refetch } = useTasksApi();
    return { data: tasks, isLoading, error, refetch };
};