import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "../../../configs/app.config";
import { useAuth } from "../../Auth/hooks/useAuth";

export const getUsageOverview = async () => {
  const { data } = await api.get(endpoints.usageOverview);
  return data;
};

export const getUsageSummary = async () => {
  const { data } = await api.get(endpoints.usageSummary);
  return data;
};

export const useUsageOverview = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["usage", "overview"],
    queryFn: getUsageOverview,
    enabled: isAuthenticated,
  });
};