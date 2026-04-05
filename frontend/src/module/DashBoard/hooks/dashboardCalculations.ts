import { useMemo } from 'react'

const dashboardCalculations = ({
    agents,
    tasks,
    selectedAgentId,
    selectedTaskId,
    search,
}: {
    agents: any[];
    tasks: any[];
    selectedAgentId: string;
    selectedTaskId: string;
    search: string;
}) => {
    // Ensure we are working with arrays
    const agentsArray = Array.isArray(agents) ? agents : [];
    const tasksArray = Array.isArray(tasks) ? tasks : [];

    const selectedAgent = useMemo(() => {
        if (!selectedAgentId) return agentsArray[0] || null;
        return agentsArray.find((a: any) => {
            const aId = String(a.id || a._id || "");
            const searchId = String(selectedAgentId);
            return aId === searchId;
        }) || agentsArray[0] || null;
    }, [agentsArray, selectedAgentId]);

    const selectedTask = useMemo(() => {
        if (!selectedTaskId) return tasksArray[0] || null;
        return tasksArray.find((t: any) => {
            const tId = String(t.id || t._id || "");
            const searchId = String(selectedTaskId);
            return tId === searchId;
        }) || null;
    }, [tasksArray, selectedTaskId]);

    const filteredTasks = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return tasksArray;

        return tasksArray.filter((task: any) => {
            const agent = agentsArray.find((a: any) => (a.id || a._id) === task.agentId);
            return (
                task.title.toLowerCase().includes(q) ||
                (task.input || "").toLowerCase().includes(q) ||
                (agent?.name || "").toLowerCase().includes(q)
            );
        });
    }, [search, tasksArray, agentsArray]);

    const totalTokens = useMemo(
        () => tasksArray.reduce((sum: number, task: any) => sum + (task.totalTokens || 0), 0),
        [tasksArray],
    );

    const totalCost = useMemo(
        () => tasksArray.reduce((sum: number, task: any) => sum + (task.estimatedCost || 0), 0),
        [tasksArray],
    );

    const completedTasks = useMemo(
        () => tasksArray.filter((t: any) => t.status === "completed").length,
        [tasksArray],
    );

    const runningTasks = useMemo(
        () => tasksArray.filter((t: any) => t.status === "running").length,
        [tasksArray],
    );

    return (
        { agents: agentsArray, tasks: tasksArray, selectedAgent, selectedTask, filteredTasks, totalTokens, totalCost, completedTasks, runningTasks }
    )
}

export default dashboardCalculations