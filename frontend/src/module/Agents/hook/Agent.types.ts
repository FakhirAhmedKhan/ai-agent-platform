export type AgentApiResponse = {
    id: string;
    name: string;
    model: string;
    systemPrompt: string;
    temperature: number;
    maxTokens: number;
    memoryEnabled: boolean;
    status?: string;
    totalTokens?: number;
    totalCost?: number;
    lastRun?: string | null;
};

export type Agent = {
    id: string;
    name: string;
    role: string;
    model: string;
    temperature: number;
    maxTokens: number;
    memoryEnabled: boolean;
    status: string;
    totalTokens: number;
    totalCost: number;
    lastRun: string;
};

export type AgentFormData = {
    name: string;
    role: string;
    model: string;
    temperature: number;
    maxTokens: number;
    memoryEnabled: boolean;
    status: string;
    systemPrompt: string;
};

export type CreateAgentPayload = {
    name: string;
    systemPrompt: string;
    model: string;
    temperature: number;
    maxTokens: number;
    memoryEnabled: boolean;
    status: "idle" | "active" | "paused" | "completed" | "error";
};
export type AgentApiHook = {
    agents: AgentApiResponse[];
    createAgent: (payload: CreateAgentPayload) => Promise<void>;
    deleteAgent: (id: string) => Promise<void>;
    isLoading: boolean;
    isCreating: boolean;
    isDeleting: boolean;
    error: string | null;
    refetch: () => void;
};

export type AgentFormStore = {
    showForm: boolean;
    formData: AgentFormData;
    setShowForm: (value: boolean) => void;
    setFormData: (value: AgentFormData | ((prev: AgentFormData) => AgentFormData)) => void;
    resetForm: () => void;
    closeForm: () => void;
};

export type AgentListStore = {
    agents: AgentApiResponse[];
    deleteAgent: (id: string) => Promise<void>;
};