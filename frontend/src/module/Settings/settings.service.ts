import { api, endpoints } from "../../configs/app.config";
import { type UserSettings, type SettingsUpdatePayload } from "./types";

export const getSettings = async (): Promise<UserSettings> => {
  const { data } = await api.get(endpoints.settings);
  return data;
};

export const updateSettings = async (payload: SettingsUpdatePayload): Promise<UserSettings> => {
  const { data } = await api.put(endpoints.settingsUpdate, payload);
  return data;
};
