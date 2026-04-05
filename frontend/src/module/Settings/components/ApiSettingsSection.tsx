import React from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { SectionCard } from "./SettingsUI";

export const ApiSettingsSection = ({ 
    apiSettings, 
    setApiSettings, 
    handleSaveApi, 
    isUpdating, 
    settings 
}: any) => {
    const [showKey, setShowKey] = React.useState(false);

    return (
        <SectionCard 
            title="API Configuration" 
            description="Connect your AI providers and manage authentication."
            icon={Shield}
            onSave={handleSaveApi}
            isSaving={isUpdating}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Service Provider</label>
                        <select 
                            className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
                            value={apiSettings.provider}
                            onChange={(e) => setApiSettings({...apiSettings, provider: e.target.value as any})}
                        >
                            <option value="mock">Mock Provider (Demo)</option>
                            <option value="gemini">Google Gemini AI</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Gemini API Key</label>
                    <div className="relative">
                        <input 
                            type={showKey ? "text" : "password"}
                            placeholder={settings?.api?.geminiKey ? "Key saved — leave empty to keep current" : "Enter your API key"}
                            className="w-full h-12 pl-4 pr-12 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
                            value={apiSettings.geminiKey}
                            onChange={(e) => setApiSettings({...apiSettings, geminiKey: e.target.value})}
                        />
                        <button 
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {settings?.api?.geminiKey ? (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <p className="text-xs text-emerald-600 font-medium">Key saved: {settings.api.geminiKey}</p>
                        </div>
                    ) : (
                        <p className="text-xs text-amber-500 font-medium">No API key configured yet</p>
                    )}
                </div>
            </div>
        </SectionCard>
    );
};
