import { createContext, useContext, useMemo, type ReactNode } from "react";
import { ApiContext } from "../../../AppContext";
import { useAgentPage } from "./useAgentPage";
import type {
  AgentApiHook,
  AgentFormStore,
  AgentListStore,
} from "./Agent.types";

export type AgentFormContextType = AgentFormStore & {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const AgentFormContext = createContext<AgentFormContextType>(null as any);
export const AgentListContext = createContext<AgentListStore>(null as any);

type Props = {
  children: ReactNode;
};

export const AgentProvider = ({ children }: Props) => {
  const { sharedAgentsApi } = useContext(ApiContext) as {
    sharedAgentsApi: AgentApiHook;
  };
  const agentsData = useAgentPage(sharedAgentsApi);

  const formValue = useMemo(
    () => ({
      showForm: agentsData.showForm,
      setShowForm: agentsData.setShowForm,
      formData: agentsData.formData,
      setFormData: agentsData.setFormData,
      handleSubmit: agentsData.handleSubmit,
      closeForm: agentsData.closeForm,
      resetForm: agentsData.resetForm,
    }),
    [
      agentsData.showForm,
      agentsData.setShowForm,
      agentsData.formData,
      agentsData.setFormData,
      agentsData.handleSubmit,
      agentsData.closeForm,
      agentsData.resetForm,
    ],
  );

  const listValue = useMemo(
    () => ({
      agents: agentsData.agents,
      deleteAgent: agentsData.deleteAgent,
    }),
    [agentsData.agents, agentsData.deleteAgent],
  );

  return (
    <AgentFormContext.Provider value={formValue}>
      <AgentListContext.Provider value={listValue}>
        {children}
      </AgentListContext.Provider>
    </AgentFormContext.Provider>
  );
};
