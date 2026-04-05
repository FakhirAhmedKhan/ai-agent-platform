// export type AgentFormData = {
//     name: string;
//     role: string;
//     model: string;
//     temperature: number;
//     maxTokens: number;
//     memoryEnabled: boolean;
//     status: string;
//     systemPrompt: string;
// };
export type TaskForm = {
    title: string;
    agentId: string;
    input: string;
};