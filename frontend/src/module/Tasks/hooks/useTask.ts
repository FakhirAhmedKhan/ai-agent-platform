// src/module/Tasks/hook/useTasksLogic.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { initialTaskForm } from "../../../assets/data";
import type { TaskForm } from "../../../configs/types/hook.type";

export const useTasksLogic = (agents: any[] = [], sharedTasksApi: any = null) => {
    const {
        tasks = [],
        isLoading,
        isCreating,
        isRunning,
        error: apiError,
        mutateCreate,
        mutateRun,
        mutateStop,
    } = sharedTasksApi || {
        tasks: [],
        isLoading: false,
        isCreating: false,
        isRunning: false,
        error: null,
        mutateCreate: async () => {},
        mutateRun: async () => {},
        mutateStop: async () => {},
    };

    const [taskForm, setTaskForm] = useState<TaskForm>(initialTaskForm);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    useEffect(() => {
        if (agents.length > 0 && !taskForm.agentId) {
            setTaskForm((prev) => ({
                ...prev,
                agentId: agents[0].id,
            }));
        }
    }, [agents, taskForm.agentId]);

    const runRealTask = useCallback(
        async (taskId: string) => {
            try {
                await mutateRun(taskId);
            } catch (error) {
                console.error("Failed to run task:", error);
            }
        },
        [mutateRun],
    );

    const createRealTask = useCallback(async () => {
        if (!taskForm.title.trim() || !taskForm.input.trim()) return;

        const fallbackAgentId = agents[0]?.id ?? "";
        const payload = {
            title: taskForm.title,
            agentId: taskForm.agentId || fallbackAgentId,
            input: taskForm.input,
        };

        try {
            const newTask = await mutateCreate(payload);
            
            setTaskForm({
                title: "",
                agentId: fallbackAgentId,
                input: "",
            });

            // Automatically select and run the new task
            if (newTask && (newTask.id || newTask._id)) {
                const newTaskId = newTask.id || newTask._id;
                setSelectedTaskId(newTaskId);
                await runRealTask(newTaskId);
            }
        } catch (error) {
            console.error("Failed to create mission:", error);
        }
    }, [taskForm, agents, mutateCreate, runRealTask]);

    const loading = isLoading || isCreating || isRunning;

    const error = apiError || null;

    const selectedTask = useMemo(
        () => tasks.find((t: any) => (t.id || t._id) === selectedTaskId) || null,
        [tasks, selectedTaskId],
    );

    return useMemo(
        () => ({
            taskData: {
                agents,
                tasks,
                taskForm,
                setTaskForm,
                runMockTask: runRealTask,
                createTask: createRealTask,
                loading,
                error,
                selectedTaskId,
                selectedTask,
                setSelectedTaskId,
                mutateStop,
            },
        }),
        [
            agents,
            tasks,
            taskForm,
            runRealTask,
            createRealTask,
            loading,
            error,
            selectedTaskId,
            selectedTask,
            mutateStop,
        ],
    );
};