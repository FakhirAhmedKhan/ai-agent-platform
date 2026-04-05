import { Bot, Plus } from "lucide-react";
import { useContext } from "react";
import { AgentFormContext } from "../hook/Agent.Provider";

const AgentHeader = () => {
  const { showForm, setShowForm } = useContext(AgentFormContext);
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold flex items-center gap-3">
        <Bot className="w-7 h-7 text-slate-900" />
        Active Agents
      </h3>
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
      >
        {showForm ? (
          "Cancel"
        ) : (
          <>
            <Plus className="w-4 h-4" /> New Agent
          </>
        )}
      </button>
    </div>
  );
};

export default AgentHeader;
