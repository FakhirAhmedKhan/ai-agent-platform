import React from "react";
import { Palette } from "lucide-react";
import { SectionCard, Toggle } from "./SettingsUI";

export const AppearanceSettingsSection = ({ 
    appearanceSettings, 
    setAppearanceSettings, 
    handleSaveAppearance, 
    isUpdating 
}: any) => (
    <SectionCard 
        title="Appearance & Demo" 
        description="Customize the look and behavior of the platform."
        icon={Palette}
        onSave={handleSaveAppearance}
        isSaving={isUpdating}
    >
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-700">Theme Mode</label>
                    <div className="flex p-1 rounded-2xl bg-slate-100 space-x-1">
                        {(["light", "dark"] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setAppearanceSettings({...appearanceSettings, theme: mode})}
                                className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                                    appearanceSettings.theme === mode 
                                    ? "bg-white text-slate-900 shadow-sm" 
                                    : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-700">Accent Color</label>
                    <div className="flex items-center gap-3">
                        <input 
                            type="color"
                            className="w-12 h-12 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
                            value={appearanceSettings.accentColor}
                            onChange={(e) => setAppearanceSettings({...appearanceSettings, accentColor: e.target.value})}
                        />
                        <input 
                            type="text"
                            className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm uppercase"
                            value={appearanceSettings.accentColor}
                            onChange={(e) => setAppearanceSettings({...appearanceSettings, accentColor: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <Toggle 
                    label="Demo Mode" 
                    description="Enable tutorial prompts and mock overlays"
                    enabled={appearanceSettings.demoMode}
                    onChange={(val) => setAppearanceSettings({...appearanceSettings, demoMode: val})}
                />
                <Toggle 
                    label="Mock Provider Force" 
                    description="Ignore real API keys and use mock data"
                    enabled={appearanceSettings.mockProviderMode}
                    onChange={(val) => setAppearanceSettings({...appearanceSettings, mockProviderMode: val})}
                />
            </div>
        </div>
    </SectionCard>
);
