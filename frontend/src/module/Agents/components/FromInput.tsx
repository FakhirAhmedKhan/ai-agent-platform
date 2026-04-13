import { useContext } from "react";
import models from "../../../assets/models";
import { AgentFormContext } from "../hook/Agent.Provider";
import InputSlider from "@/utils/InputRangeSlider";

const FromInput = () => {
  const { formData, setFormData } = useContext(AgentFormContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputSlider
        label=" Agent Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        placeholder="e.g. Content Strategist"
        className={
          "w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-medium"
        }
      />

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
      <InputSlider
        label="Primary Role & Instructions"
        type="text"
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
      <InputSlider
        label="Max Tokens"
        type="number"
        value={formData.maxTokens}
        onChange={(e) =>
          setFormData({
            ...formData,
            maxTokens: parseInt(e.target.value),
          })
        }
        placeholder=""
        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-medium resize-none"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputSlider
          label={`Temperature (${formData.temperature})`}
          type="range"
          value={formData.temperature}
          onChange={(e) =>
            setFormData({
              ...formData,
              temperature: parseFloat(e.target.value),
            })
          }
          placeholder="e.g. Content Strategist"
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 mt-4"
        />

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
    </div>
  );
};

export default FromInput;
