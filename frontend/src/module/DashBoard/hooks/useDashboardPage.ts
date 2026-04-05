import { useMemo } from "react";
import dashboardCalculations from "./dashboardCalculations";
import { useDashboardStore } from "./dashboard.store";

export const useDashboardLogic = (agents: any[] = [], sharedTasksApi: any = null) => {
  const { tasks = [] } = sharedTasksApi || { tasks: [] };
  const {
    selectedAgentId,
    selectedTaskId,
    search,
    setSelectedAgentId,
    setSelectedTaskId,
    setSearch,
  } = useDashboardStore();

  const calculations = dashboardCalculations({
    agents,
    tasks,
    selectedAgentId,
    selectedTaskId,
    search,
  });

  return useMemo(
    () => ({
      dashBoardData: {
        ...calculations,
        selectedAgentId,
        selectedTaskId,
        search,
        setSelectedAgentId,
        setSelectedTaskId,
        setSearch,
      },
    }),
    [
      calculations,
      selectedAgentId,
      selectedTaskId,
      search,
      setSelectedAgentId,
      setSelectedTaskId,
      setSearch,
    ],
  );
};