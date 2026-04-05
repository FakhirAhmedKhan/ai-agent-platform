import { useCallback, useMemo } from "react";
import { useAgentFormStore } from "./useAgentForm";
import type { AgentApiHook } from "./Agent.types";
import { mapFormToCreateAgentPayload } from "./Agent.Res";

export const useAgentPage = (api: AgentApiHook) => {
    // Form State coming form zustand Handle
    const { showForm, setShowForm, formData, setFormData, closeForm, resetForm, } = useAgentFormStore();

    // Create Agent
    const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.role.trim()) return;
        await api.createAgent(mapFormToCreateAgentPayload(formData));
        closeForm();
    },
        [formData, closeForm, api]
    );

    // Delete Agent
    const handleDeleteAgent = useCallback(async (id: string) => { await api.deleteAgent(id); }, [api]);

    // Fetch agents
    const HandleFeatchAgents = useCallback(() => { api.refetch(); }, [api]);

    // Variable for useMemo
    const value = useMemo(
        () => ({ HandleFeatchAgents, showForm, setShowForm, formData, setFormData, handleSubmit, deleteAgent: handleDeleteAgent, agents: api.agents, closeForm, resetForm, }),
        [showForm, setShowForm, formData, setFormData, handleSubmit, handleDeleteAgent, api.agents, closeForm, resetForm]
    );

    return value;
};