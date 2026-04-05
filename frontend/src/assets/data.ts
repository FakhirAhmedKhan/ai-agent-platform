import type { AgentFormData, CreateAgentPayload } from "@/module/Agents/hook/Agent.types";

export const initialAgents = [
  {
    id: "agent_1",
    name: "Marketing Agent",
    role: "Campaign strategist for launches, social messaging, and ad copy.",
    model: "mock-model-v1",
    temperature: 0.7,
    maxTokens: 700,
    memoryEnabled: true,
    status: "active",
    totalTokens: 10480,
    totalCost: 1.42,
    lastRun: "2026-03-28 09:30",
  },
  {
    id: "agent_2",
    name: "Sales Agent",
    role: "Turns product ideas into persuasive sales pitches and follow-ups.",
    model: "mock-model-v1",
    temperature: 0.5,
    maxTokens: 600,
    memoryEnabled: true,
    status: "active",
    totalTokens: 8920,
    totalCost: 1.11,
    lastRun: "2026-03-28 08:10",
  },
  {
    id: "agent_3",
    name: "Support Agent",
    role: "Friendly customer support helper for FAQs and troubleshooting.",
    model: "mock-model-v1",
    temperature: 0.3,
    maxTokens: 500,
    memoryEnabled: false,
    status: "paused",
    totalTokens: 4300,
    totalCost: 0.53,
    lastRun: "2026-03-27 18:45",
  },
];

export const initialTasks = [
  {
    id: "task_1",
    agentId: "agent_1",
    title: "Launch campaign for AI inventory app",
    input:
      "Create a 7-day product launch campaign for a SaaS inventory platform targeting small businesses.",
    output:
      "Here is a 7-day campaign plan: Day 1 teaser post, Day 2 founder story, Day 3 feature reel, Day 4 pain-point carousel, Day 5 customer use-case, Day 6 live demo CTA, Day 7 limited-time offer.",
    status: "completed",
    promptTokens: 180,
    outputTokens: 240,
    totalTokens: 420,
    estimatedCost: 0.021,
    createdAt: "2026-03-28 09:20",
    completedAt: "2026-03-28 09:21",
  },
  {
    id: "task_2",
    agentId: "agent_2",
    title: "Convert campaign into sales pitch",
    input:
      "Turn this launch angle into a short sales pitch for WhatsApp outreach.",
    output:
      "We help small businesses stop losing money through poor stock visibility. With real-time tracking, alerts, and easy reporting, your team stays faster and more organized.",
    status: "running",
    promptTokens: 90,
    outputTokens: 0,
    totalTokens: 90,
    estimatedCost: 0.005,
    createdAt: "2026-03-28 09:27",
    completedAt: null,
  },
  {
    id: "task_3",
    agentId: "agent_3",
    title: "Refund request response",
    input:
      "Draft a helpful reply to a customer asking for a refund after 10 days of use.",
    output: "",
    status: "failed",
    promptTokens: 70,
    outputTokens: 0,
    totalTokens: 70,
    estimatedCost: 0.004,
    createdAt: "2026-03-27 18:40",
    completedAt: null,
    errorMessage: "Mock provider timeout",
  },
  {
    id: "task_4",
    agentId: "agent_1",
    title: "SEO blog ideas",
    input: "Suggest 10 SEO blog titles for warehouse and inventory software.",
    output: "",
    status: "pending",
    promptTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    createdAt: "2026-03-28 10:00",
    completedAt: null,
  },
];

export const initialForm: AgentFormData = {
  name: "",
  role: "",
  model: "mock-model-v2",
  temperature: 0.7,
  maxTokens: 1000,
  memoryEnabled: true,
  status: "active",
  systemPrompt: "",
};
// TaskForm
export const initialTaskForm: any = {
  title: "",
  agentId: "",
  input: "",
};
