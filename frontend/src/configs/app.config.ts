import axios from "axios";

export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const userId = localStorage.getItem('userId');
                if (!refreshToken || !userId) throw new Error('No refresh info');

                const { data } = await axios.post(`${API_URL}/auth/refresh`, { userId, refreshToken });
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export const endpoints = {
    agents: "/agents",
    agentsCreate: "/agents",
    agentsDelete: (id: string) => `/agents/${id}`,
    agentsById: (id: string) => `/agents/${id}`,
    agentsUpdate: (id: string) => `/agents/${id}`,
    dashboard: "/dashboard",
    dashboardSummary: "/dashboard/summary",
    tasks: "/tasks",
    tasksRun: (id: string) => `/tasks/${id}/run`,
    tasksStop: (id: string) => `/tasks/${id}/stop`,
    tasksDelete: (id: string) => `/tasks/${id}`,
    tasksById: (id: string) => `/tasks/${id}`,
    tasksUpdate: (id: string) => `/tasks/${id}`,
    tasksCreate: "/tasks",
    usageOverview: "/usage/overview",
    usageSummary: "/usage/summary",
    settings: "/settings",
    settingsUpdate: "/settings",
    notes: "/notes",
    notesUpdate: (id: string) => `/notes/${id}`,
    notesDelete: (id: string) => `/notes/${id}`,
    user: "/user",
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        refresh: "/auth/refresh",
        logout: "/auth/logout",
        me: "/auth/me",
    },
};
