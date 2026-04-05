import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getTasks, runTask } from "./Dashboard.service";
import { api, endpoints } from "../../../configs/app.config";

export const getAgents = async () => {
  const { data } = await api.get(endpoints.agents);
  return data;
};

export const getTasks = async () => {
  const { data } = await api.get(endpoints.tasks);
  return data;
};

export const getUsageSummary = async () => {
  const { data } = await api.get(endpoints.usageSummary);
  return data;
};

export const runTask = async (taskId: string) => {
  const { data } = await api.post(endpoints.tasksRun(taskId));
  return data;
};

export const useDashboardApi = () => {

  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { mutateAsync: runTaskMutation, isPending } = useMutation({
    mutationFn: runTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks,
    isLoading,
    error: error ? "Failed to fetch tasks" : null,
    runTask: runTaskMutation,
    isRunning: isPending,
  };
};