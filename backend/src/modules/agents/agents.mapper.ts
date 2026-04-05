
export const toAgentResponse = (agent: any) => ({
  id: agent._id?.toString() || agent.id,
  name: agent.name,
  model: agent.model,
  systemPrompt: agent.systemPrompt,
  temperature: agent.temperature,
  maxTokens: agent.maxTokens,
  memoryEnabled: agent.memoryEnabled,
  status: agent.status,
  totalTokens: agent.totalTokens ?? 0,
  totalCost: agent.totalCost ?? 0,
  lastRun: agent.lastRun ?? null,
  createdAt: agent.createdAt,
  updatedAt: agent.updatedAt,
});