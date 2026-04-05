import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "./settings.service";
import { type UserSettings, type SettingsUpdatePayload } from "./types";
import { useAuth } from "../Auth/hooks/useAuth";

export const useSettingsPage = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    // Fetching settings
    const { 
        data: settings, 
        isLoading, 
        isError, 
        error 
    } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
        enabled: isAuthenticated,
    });

    // Local form state
    const [apiSettings, setApiSettings] = useState<UserSettings["api"]>({
        geminiKey: "",
        provider: "mock",
    });

    const [notificationSettings, setNotificationSettings] = useState<UserSettings["notifications"]>({
        emailNotifications: false,
        inAppNotifications: true,
        taskCompletedAlerts: true,
        taskFailedAlerts: true,
    });

    const [appearanceSettings, setAppearanceSettings] = useState<UserSettings["appearance"]>({
        theme: "light",
        accentColor: "#3b82f6",
        demoMode: false,
        mockProviderMode: true,
    });

    // Sync remote settings to local state
    useEffect(() => {
        if (settings) {
            setApiSettings({
                provider: settings.api?.provider || "mock",
                geminiKey: "", // Keep it empty locally to avoid re-submitting masked keys
            });
            setNotificationSettings(settings.notifications);
            setAppearanceSettings(settings.appearance);
        }
    }, [settings]);

    // Update settings mutation
    const updateMutation = useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
    });

    const handleSaveApi = () => {
        // Build payload — only include geminiKey if the user actually typed a new one
        const apiPayload: any = { provider: apiSettings.provider };
        if (apiSettings.geminiKey && apiSettings.geminiKey.trim() !== "") {
            apiPayload.geminiKey = apiSettings.geminiKey;
        }
        updateMutation.mutate({ api: apiPayload });
    };

    const handleSaveNotifications = () => {
        updateMutation.mutate({ notifications: notificationSettings });
    };

    const handleSaveAppearance = () => {
        updateMutation.mutate({ appearance: appearanceSettings });
    };

    return {
        // State
        apiSettings,
        setApiSettings,
        notificationSettings,
        setNotificationSettings,
        appearanceSettings,
        setAppearanceSettings,
        
        // Status
        isLoading,
        isError,
        error: (error as Error)?.message || null,
        isUpdating: updateMutation.isPending,
        updateSuccess: updateMutation.isSuccess,
        updateError: (updateMutation.error as Error)?.message || null,

        // Handlers
        handleSaveApi,
        handleSaveNotifications,
        handleSaveAppearance,
        settings, // for masked key info
    };
};
