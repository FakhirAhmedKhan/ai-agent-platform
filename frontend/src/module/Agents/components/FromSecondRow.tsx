import { useContext } from "react";
import { AgentFormContext } from "../hook/Agent.Provider";

const FromSecondRow = () => {
    const { formData, setFormData } = useContext(AgentFormContext);

    return (<>
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
                Primary Role & Instructions
            </label>
            <textarea
                required
                rows={3}
                value={formData.role}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        role: e.target.value,
                    })
                }
                placeholder="Describe what this agent does..."
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-medium resize-none"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
                    Temperature ({formData.temperature})
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            temperature: parseFloat(e.target.value),
                        })
                    }
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 mt-4"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
                    Max Tokens
                </label>
                <input
                    type="number"
                    value={formData.maxTokens}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            maxTokens: parseInt(e.target.value),
                        })
                    }
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-medium"
                />
            </div>
            <div className="flex items-center gap-3 pt-6">
                <input
                    type="checkbox"
                    id="memory"
                    checked={formData.memoryEnabled}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            memoryEnabled: e.target.checked,
                        })
                    }
                    className="w-5 h-5 rounded-lg border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <label
                    htmlFor="memory"
                    className="text-sm font-bold text-slate-700 cursor-pointer"
                >
                    Enable Long-term Memory
                </label>
            </div>
        </div>
    </>
    )
}

export default FromSecondRow