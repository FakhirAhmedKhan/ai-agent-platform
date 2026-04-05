import { useMemo } from "react";

const useAgentUsageCalcuations = (tasks: any[], overview: any) => {
    const totalTokens = useMemo(() => {
        if (overview?.totalTokens != null) return overview.totalTokens;
        return tasks.reduce((sum: number, t: any) => sum + (t.totalTokens || 0), 0);
    }, [tasks, overview]);

    const totalCost = useMemo(() => {
        if (overview?.totalCost != null) return overview.totalCost;
        return tasks.reduce((sum: number, t: any) => sum + (t.estimatedCost || 0), 0);
    }, [tasks, overview]);

    const avgCostPerTask = useMemo(() => {
        if (overview?.avgCostPerTask != null) return overview.avgCostPerTask;
        return tasks.length > 0 ? totalCost / tasks.length : 0;
    }, [tasks, totalCost, overview]);
    return {
        totalTokens,
        totalCost,
        avgCostPerTask
    }
}

export default useAgentUsageCalcuations