import { formatMoney } from "../../../test";
import { BarChart3 } from "lucide-react";
import { useUsageContext } from "@/AppContext";

const AgentAllocation = () => {
  const { usageData } = useUsageContext();

  return (
    <div className="lg:col-span-8">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-900" />
              Agent Resource Allocation
            </h3>
          </div>
          <button className="text-xs font-bold text-slate-900 uppercase tracking-widest bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            Export CSV
          </button>
        </div>

        <div className="p-8 space-y-8">
          {usageData.agents.map((agent: any) => {
            const agentTasks = usageData.tasks.filter(
              (t: any) => t.agentId === agent.id,
            );
            const agentTokens = agentTasks.reduce(
              (sum: number, t: any) => sum + t.totalTokens,
              0,
            );
            const agentCost = agentTasks.reduce(
              (sum: number, t: any) => sum + t.estimatedCost,
              0,
            );
            const percentage =
              usageData.totalTokens > 0
                ? (agentTokens / usageData.totalTokens) * 100
                : 0;

            return (
              <div key={agent.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-900">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{agent.name}</p>
                      <p className="text-xs text-slate-500">{agent.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">
                      {agentTokens.toLocaleString()} tokens
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatMoney(agentCost)}
                    </p>
                  </div>
                </div>
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentAllocation;
