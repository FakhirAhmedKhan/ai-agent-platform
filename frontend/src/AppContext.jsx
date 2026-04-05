import { createContext, useContext, useMemo } from "react";
import { useCostEstimator } from "./module/Estimator/CostEstimator/hook/useCostEstiimator";
import { usePromptGenerator } from "./module/Estimator/PromptGenerator/hook/usePromptGenerator";
import { useWordCounter } from "./module/Estimator/WordCounter/hook/useWordCounter";
import { useModelComparison } from "./module/Estimator/ModelComparison/hook/useModelComparison";
import { useDashboardLogic } from "./module/DashBoard/hooks/useDashboardPage";
import { useTasksLogic } from "./module/Tasks/hooks/useTask";
import { useUsage } from "./module/usage/hooks/useUsage";
import { useSiderBar } from "./module/navigation/components/useSiderBar";
import { useNote } from "./module/notes/components/config/useNote";
import { useSettingsPage } from "./module/Settings/useSettingsPage";
import { useAgentApi } from "./module/Agents/hook/AgentApi";
import { useTasksApi } from "./module/Tasks/hooks/useTasksApi";

import { AgentProvider } from "./module/Agents/hook/Agent.Provider";

export const ApiContext = createContext(null);
export const AgentContext = createContext(null);
export const TaskContext = createContext(null);
export const DashBoardContext = createContext(null);
export const UsageContext = createContext(null);
export const NoteContext = createContext(null);
export const SettingsContext = createContext(null);
export const EstimatorContext = createContext(null);
export const SideBarContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const sharedAgentsApi = useAgentApi();
  const sharedTasksApi = useTasksApi();
  return (
    <ApiContext.Provider value={{ sharedAgentsApi, sharedTasksApi }}>
      {children}
    </ApiContext.Provider>
  );
};

export const TaskProvider = ({ children }) => {
  const { sharedAgentsApi, sharedTasksApi } = useContext(ApiContext);
  const { taskData } = useTasksLogic(sharedAgentsApi.agents, sharedTasksApi);
  return (
    <TaskContext.Provider value={{ taskData }}>{children}</TaskContext.Provider>
  );
};

export const DashBoardProvider = ({ children }) => {
  const { sharedAgentsApi, sharedTasksApi } = useContext(ApiContext);
  const { dashBoardData } = useDashboardLogic(
    sharedAgentsApi.agents,
    sharedTasksApi,
  );
  return (
    <DashBoardContext.Provider value={{ dashBoardData }}>
      {children}
    </DashBoardContext.Provider>
  );
};

export const UsageProvider = ({ children }) => {
  const { sharedAgentsApi, sharedTasksApi } = useContext(ApiContext);
  const { usageData } = useUsage(sharedAgentsApi.agents, sharedTasksApi);
  return (
    <UsageContext.Provider value={{ usageData }}>
      {children}
    </UsageContext.Provider>
  );
};

export const NoteProvider = ({ children }) => {
  const { noteData } = useNote();
  return (
    <NoteContext.Provider value={{ noteData }}>{children}</NoteContext.Provider>
  );
};

export const SettingsProvider = ({ children }) => {
  const settingsData = useSettingsPage();
  return (
    <SettingsContext.Provider value={{ settingsData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const EstimatorProvider = ({ children }) => {
  const { useCostEst } = useCostEstimator();
  const { useWordCou } = useWordCounter(
    useCostEst.setWords,
    useCostEst.setResults,
  );
  const { usePromptGen } = usePromptGenerator(useWordCou.handlePromptGenerated);
  const { useModelComp } = useModelComparison();
  return (
    <EstimatorContext.Provider
      value={{ useCostEst, useWordCou, usePromptGen, useModelComp }}
    >
      {children}
    </EstimatorContext.Provider>
  );
};

export const SideBarProvider = ({ children }) => {
  const { sideBarData } = useSiderBar();
  return (
    <SideBarContext.Provider value={{ sideBarData }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const AppProvider = ({ children }) => {
  return (
    <ApiProvider>
      <SideBarProvider>
        <SettingsProvider>
          <NoteProvider>
            <AgentProvider>
              <TaskProvider>
                <DashBoardProvider>
                  <UsageProvider>
                    <EstimatorProvider>{children}</EstimatorProvider>
                  </UsageProvider>
                </DashBoardProvider>
              </TaskProvider>
            </AgentProvider>
          </NoteProvider>
        </SettingsProvider>
      </SideBarProvider>
    </ApiProvider>
  );
};

export const useAgentContext = () => useContext(AgentContext);
export const useTaskContext = () => useContext(TaskContext);
export const useDashBoardContext = () => useContext(DashBoardContext);
export const useUsageContext = () => useContext(UsageContext);
export const useNoteContext = () => useContext(NoteContext);
export const useSettingsContext = () => useContext(SettingsContext);
export const useEstimatorContext = () => useContext(EstimatorContext);
export const useSideBarContext = () => useContext(SideBarContext);
