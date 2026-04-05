import { Bot } from "lucide-react";
import { useDashBoardContext } from "@/AppContext";
import { AgentCard } from "../../../utils/AgentCard";

const AgentSelector = () => {
  const context = useDashBoardContext();
  const dashBoardData = context?.dashBoardData;

  return (
    <div className="space-y-6 ">
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Agents</p>
            <h3 className="text-xl font-bold mt-1">AI workers</h3>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <Bot className="w-5 h-5 text-slate-700" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {(dashBoardData?.agents || []).map((agent: any) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              selected={agent.id === dashBoardData?.selectedAgentId}
              onSelect={() => {
                dashBoardData?.setSelectedAgentId?.(agent.id);
                
                // Automatically select the latest task for this agent if available
                const agentTasks = (dashBoardData?.filteredTasks || []).filter((t: any) => {
                  const tId = t.agentId?._id || t.agentId;
                  return tId === agent.id;
                });
                if (agentTasks.length > 0) {
                  dashBoardData?.setSelectedTaskId?.(agentTasks[0].id);
                }

                dashBoardData?.setTaskForm?.((prev: any) => ({
                  ...prev,
                  agentId: agent.id,
                }));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentSelector;
