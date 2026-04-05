import { api, endpoints } from "../../../configs/app.config";

export const loginApi = async (data: any) => {
    const response = await api.post(endpoints.auth.login, data);
    return response.data;
};

export const registerApi = async (data: any) => {
    const response = await api.post(endpoints.auth.register, data);
    return response.data;
};

export const logoutApi = async () => {
    const response = await api.post(endpoints.auth.logout);
    return response.data;
};

export const getMeApi = async () => {
    const response = await api.get(endpoints.auth.me);
    return response.data;
};

export const refreshTokenApi = async (userId: string, refreshToken: string) => {
    const response = await api.post(endpoints.auth.refresh, { userId, refreshToken });
    return response.data;
};
