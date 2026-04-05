import type { AgentApiResponse, AgentFormData } from "./Agent.types";
// Agent coming from Frontend Response
export const mapFormToCreateAgentPayload = (formData: AgentFormData) => ({
    name: formData.name,
    model: formData.model,
    temperature: formData.temperature,
    maxTokens: formData.maxTokens,
    memoryEnabled: formData.memoryEnabled,
    systemPrompt: formData.role,
    status: "active" as const,
});

// Agent coming from backend response
export const mapAgentToFormData = (agent: AgentApiResponse) => ({
    name: agent.name,
    model: agent.model,
    temperature: agent.temperature,
    maxTokens: agent.maxTokens,
    memoryEnabled: agent.memoryEnabled,
    systemPrompt: agent.systemPrompt,
    status: agent.status,
});