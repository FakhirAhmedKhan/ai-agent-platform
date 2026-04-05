import { TaskRow } from "../../../test";
import { Search } from "lucide-react";
import { useDashBoardContext } from "@/AppContext";

const ExecutionHistory = () => {
  const context = useDashBoardContext();
  const dashBoardData = context?.dashBoardData;

  const selectedAgentId = dashBoardData?.selectedAgentId;
  const tasksToShow = (dashBoardData?.filteredTasks || []).filter((task: any) => {
    const taskAgentId = task.agentId?._id || task.agentId;
    return !selectedAgentId || taskAgentId === selectedAgentId;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Tasks</p>
              <h3 className="text-xl font-bold mt-1">
                {selectedAgentId ? (
                  <>
                    <span className="text-slate-400 font-normal mr-1">History for</span>
                    {(dashBoardData?.agents || []).find((a: any) => (a.id || a._id) === selectedAgentId)?.name || "Agent"}
                  </>
                ) : (
                  "Global Execution History"
                )}
              </h3>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={dashBoardData?.search || ""}
                onChange={(e) => dashBoardData?.setSearch?.(e.target.value)}
                placeholder="Search tasks or agents"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-100">
          <div className="col-span-4">Task</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Tokens</div>
          <div className="col-span-2">Cost</div>
          <div className="col-span-2 text-right">Created</div>
        </div>

        <div className="max-h-[560px] overflow-auto">
          {tasksToShow.map((task: any) => {
            const taskAgentId = task.agentId?._id || task.agentId;
            const agentName =
              (dashBoardData?.agents || []).find((a: any) => (a.id || a._id) === taskAgentId)?.name ||
              "Unknown Agent";
            return (
              <TaskRow
                key={task.id}
                task={task}
                agentName={agentName}
                selected={task.id === dashBoardData?.selectedTaskId}
                onSelect={() => dashBoardData?.setSelectedTaskId?.(task.id)}
              />
            );
          })}
          {tasksToShow.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-400">
                {selectedAgentId
                  ? "No execution history found for this agent."
                  : "No execution history found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutionHistory;
