import React from "react";
import { Loader2, Save, ToggleLeft, ToggleRight } from "lucide-react";

export const SectionCard = ({ 
    title, 
    description, 
    icon: Icon, 
    children, 
    onSave, 
    isSaving 
}: { 
    title: string; 
    description: string; 
    icon: any; 
    children: React.ReactNode;
    onSave: () => void;
    isSaving: boolean;
}) => (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                    <Icon className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 max-w-sm mt-0.5">{description}</p>
                </div>
            </div>
            <button 
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[120px]"
            >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save
            </button>
        </div>
        <div className="p-8 bg-slate-50/30">
            {children}
        </div>
    </div>
);

export const Toggle = ({ 
    label, 
    description, 
    enabled, 
    onChange 
}: { 
    label: string; 
    description: string; 
    enabled: boolean; 
    onChange: (val: boolean) => void;
}) => (
    <div className="flex items-center justify-between group">
        <div className="space-y-0.5">
            <label className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors cursor-pointer" onClick={() => onChange(!enabled)}>
                {label}
            </label>
            <p className="text-xs text-slate-500">{description}</p>
        </div>
        <button 
            onClick={() => onChange(!enabled)}
            className="focus:outline-none transition-all scale-110"
        >
            {enabled ? (
                <ToggleRight className="w-10 h-10 text-slate-900 fill-slate-900/10 transition-all" />
            ) : (
                <ToggleLeft className="w-10 h-10 text-slate-300 transition-all" />
            )}
        </button>
    </div>
);
