import React from "react";
import { 
    Settings, 
    Loader2, 
    AlertCircle, 
    CheckCircle2
} from "lucide-react";
import { useSettingsContext } from "@/AppContext";
import { ApiSettingsSection } from "./components/ApiSettingsSection";
import { NotificationSettingsSection } from "./components/NotificationSettingsSection";
import { AppearanceSettingsSection } from "./components/AppearanceSettingsSection";

const SettingsPage = () => {
    const { settingsData } = useSettingsContext();
    const {
        apiSettings,
        setApiSettings,
        notificationSettings,
        setNotificationSettings,
        appearanceSettings,
        setAppearanceSettings,
        isLoading,
        isError,
        error,
        isUpdating,
        updateSuccess,
        updateError,
        handleSaveApi,
        handleSaveNotifications,
        handleSaveAppearance,
        settings
    } = settingsData;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="w-10 h-10 text-slate-400 animate-spin" />
                <p className="text-slate-500 font-medium">Loading your settings...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 rounded-[32px] bg-rose-50 border border-rose-100 flex flex-col items-center text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-rose-500" />
                <div>
                    <h3 className="text-lg font-bold text-rose-900">Failed to load settings</h3>
                    <p className="text-rose-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Settings className="w-8 h-8" />
                    Settings
                </h2>
                <p className="text-slate-500">Manage your account preferences, API keys and application look.</p>
            </div>

            {(updateSuccess || updateError) && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${
                    updateSuccess ? "bg-emerald-50 border border-emerald-100 text-emerald-700" : "bg-rose-50 border border-rose-100 text-rose-700"
                }`}>
                    {updateSuccess ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <p className="font-medium">{updateSuccess ? "Settings updated successfully!" : updateError}</p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-8">
                {/* API Keys Section */}
                <ApiSettingsSection 
                    apiSettings={apiSettings}
                    setApiSettings={setApiSettings}
                    handleSaveApi={handleSaveApi}
                    isUpdating={isUpdating}
                    settings={settings}
                />

                {/* Notifications Section */}
                <NotificationSettingsSection 
                    notificationSettings={notificationSettings}
                    setNotificationSettings={setNotificationSettings}
                    handleSaveNotifications={handleSaveNotifications}
                    isUpdating={isUpdating}
                />

                {/* Theme & Demo Controls Section */}
                <AppearanceSettingsSection 
                    appearanceSettings={appearanceSettings}
                    setAppearanceSettings={setAppearanceSettings}
                    handleSaveAppearance={handleSaveAppearance}
                    isUpdating={isUpdating}
                />
            </div>
        </div>
    );
};

export default SettingsPage;
