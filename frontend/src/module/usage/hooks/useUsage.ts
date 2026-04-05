import { useMemo } from "react";
import { useUsageOverview } from "./usage.service";
import useAgentUsageCalcuations from "./usage.Calculations";

export const useUsage = (agents: any[] = [], sharedTasksApi: any = null) => {
    const {
        tasks = [],
        isLoading: isTasksLoading,
        error: tasksError,
    } = sharedTasksApi || { tasks: [], isLoading: false, error: null };

    const {
        data: overview,
        isLoading: isOverviewLoading,
        error: overviewError,
    } = useUsageOverview();

    const { totalTokens, totalCost, avgCostPerTask } = useAgentUsageCalcuations(tasks, overview);

    const loading = isTasksLoading || isOverviewLoading;

    const error = tasksError || (overviewError as Error)?.message || null;

    return useMemo(
        () => ({
            usageData: {
                agents,
                tasks,
                totalTokens,
                totalCost,
                avgCostPerTask,
                loading,
                error,
            },
        }),
        [agents, tasks, totalTokens, totalCost, avgCostPerTask, loading, error],
    );
};
