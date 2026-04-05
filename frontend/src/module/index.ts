import { lazy } from "react";

//Estimator Module
export const PromptGenerator = lazy(
    () => import("./Estimator/PromptGenerator/PromptGenerator"),
);
export const WordCounter = lazy(() => import("./Estimator/WordCounter/WordCounter"));
export const CostEstimator = lazy(() => import("./Estimator/CostEstimator/CostEstimator"));
export const ModelComparison = lazy(
    () => import("./Estimator/ModelComparison/ModelComparison"),
);

// Dashboard Module
export const AgentSelector = lazy(() => import("./DashBoard/components/agentSelector"));
export const ExecutionHistory = lazy(() => import("./DashBoard/components/ExecutionHistory"));
export const TaskDetail = lazy(() => import("./DashBoard/components/TaskDetail"));
export const DashboardState = lazy(() => import("./DashBoard/components/DashboardState"));

// Note Module
export const NoteHeader = lazy(() => import("./notes/components/Header"));
export const CreateNote = lazy(() => import("./notes/components/CreateNote"));
export const ReadNote = lazy(() => import("./notes/components/ReadNote"));


// Task Module
export const NewTask = lazy(() => import("./Tasks/components/NewTask"));
export const MissionLog = lazy(() => import("./Tasks/components/MissionLog"));
export const TaskOutput = lazy(() => import("./Tasks/components/TaskOutput"));

// Usage Module
export const AgentAllocation = lazy(() => import("./usage/components/AgentAllocation"));
export const AllocationDemo = lazy(() => import("../utils/demo/AllocationDemo"));
export const UsageState = lazy(() => import("./usage/components/usageState"));

// All Pages
export const DashboardPage = lazy(() => import("../module/DashBoard/page"));
export const AgentsPage = lazy(() => import("../module/Agents/page"));
export const TasksPage = lazy(() => import("../module/Tasks/page"));
export const UsagePage = lazy(() => import("../module/usage/page"));
export const SettingsPage = lazy(() => import("../module/Settings/page"));
export const CostingPage = lazy(() => import("../module/Estimator/page"));
export const NotesPage = lazy(() => import("../module/notes/page"));
export const LandingPage = lazy(() => import("../module/landing/page"));


// Agents Module Components
export const DemoPartAgent = lazy(() => import("../utils/demo/Agents"));
export const AgentShow = lazy(() => import("./Agents/components/AgentShow"));
export const ShowForm = lazy(() => import("./Agents/components/showForm"));
export const AgentHeader = lazy(() => import("./Agents/components/AgentHeader"));

// Skeleton Loader
export const SkeletonLoader = lazy(() => import("../utils/SkeletonLoader"));
export const AiProviderName = lazy(() => import("../utils/AiProviderName"));