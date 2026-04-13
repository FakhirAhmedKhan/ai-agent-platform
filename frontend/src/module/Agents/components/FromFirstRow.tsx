import { useContext } from "react";
import models from "../../../assets/models";
import { AgentFormContext } from "../hook/Agent.Provider";

const FromFirstRow = () => {
      const { formData, setFormData } = useContext(AgentFormContext);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
                    Agent Name
                </label>
                <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    placeholder="e.g. Content Strategist"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-medium"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
                    Model Selection
                </label>
                <select
                    value={formData.model}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            model: e.target.value,
                        })
                    }
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50"
                >
                    {Object.entries(models).map(([provider, modelList]) => (
                        <optgroup key={provider} label={provider}>
                            {Object.entries(modelList).map(([modelName]) => (
                                <option key={modelName} value={modelName}>
                                    {modelName}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default FromFirstRow