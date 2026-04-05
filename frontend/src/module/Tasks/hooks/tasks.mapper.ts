// src/module/Tasks/hook/tasks.mapper.ts
export const mapAgent = (agent: any) => ({
    ...agent,
    id: agent.id || agent._id,
    role: agent.role || agent.systemPrompt || "",
});

export const mapAgents = (agents: any[] = []) => agents.map(mapAgent);

export const mapTask = (task: any) => {
    const populatedAgent =
        task.agentId && typeof task.agentId === "object" ? task.agentId : null;

    return {
        ...task,
        id: task.id || task._id,
        agentId: populatedAgent ? populatedAgent._id : task.agentId,
        agentName: populatedAgent?.name || "",
        title: task.title || "",
        input: task.input || "",
        output: task.output || "",
        status: task.status || "pending",
        promptTokens: task.promptTokens || 0,
        outputTokens: task.outputTokens || 0,
        totalTokens: task.totalTokens || 0,
        estimatedCost: task.estimatedCost || 0,
        createdAt: task.createdAt || "",
        startedAt: task.startedAt || "",
        completedAt: task.completedAt || null,
        errorMessage: task.errorMessage || "",
    };
};

export const mapTasks = (tasks: any[] = []) => tasks.map(mapTask);