import { api, endpoints } from "../../../configs/app.config";

export const runTask = async (taskId: string) => {
    const { data } = await api.post(`${endpoints.tasksRun(taskId)}`);
    return data;
};

export const stopTask = async (taskId: string) => {
    const { data } = await api.post(`${endpoints.tasksStop(taskId)}`);
    return data;
};

export const deleteTask = async (taskId: string) => {
    const { data } = await api.delete(`${endpoints.tasksDelete(taskId)}`);
    return data;
};

export const getTaskById = async (taskId: string) => {
    const { data } = await api.get(`${endpoints.tasksById(taskId)}`);
    return data;
};

export const updateTask = async (taskId: string, task: any) => {
    const { data } = await api.put(`${endpoints.tasksUpdate(taskId)}`, task);
    return data;
};

export const createTask = async (task: any) => {
    const { data } = await api.post(`${endpoints.tasksCreate}`, task);
    return data;
};

export const getTasks = async () => {
    const { data } = await api.get(`${endpoints.tasks}`);
    return data;
};
export const getAgents = async () => {
    const { data } = await api.get(`${endpoints.agents}`);
    return data;
};