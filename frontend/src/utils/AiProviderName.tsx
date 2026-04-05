import { useSettingsContext } from "@/AppContext";

const AiProviderName = () => {
  const { settingsData } = useSettingsContext();
  const provider = settingsData.settings?.api?.provider || "mock";
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <p className="text-sm font-medium text-slate-500">Overview</p>
        <h2 className="text-3xl font-bold text-slate-900 mt-1">Dashboard</h2>
      </div>
      <div
        className={`px-4 py-2 rounded-2xl border flex items-center gap-2 transition-all ${
          provider === "gemini"
            ? "bg-slate-900 border-slate-900 text-white shadow-lg"
            : "bg-amber-50 border-amber-100 text-amber-700"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${
            provider === "gemini" ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
        <span className="text-sm font-bold uppercase tracking-wider">
          {provider === "gemini"
            ? "Google Gemini AI active"
            : "Demo Mode (Mock)"}
        </span>
      </div>
    </div>
  );
};

export default AiProviderName;
