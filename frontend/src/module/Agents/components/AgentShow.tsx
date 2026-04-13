import { Trash2 } from "lucide-react";
import { AgentListContext } from "../hook/Agent.Provider";
import { AgentCard } from "../../../utils/AgentCard";
import { memo, useContext } from "react";

const AgentShow = () => {
  console.log("AgentShow re-rendered");

  const { agents, deleteAgent } = useContext(AgentListContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {agents.map((agent: { id: string }) => (
        <div key={agent.id} className="group relative">
          <AgentCard agent={agent} selected={false} />
          <button
            onClick={() => deleteAgent(agent.id)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-orange-50 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default memo(AgentShow);
