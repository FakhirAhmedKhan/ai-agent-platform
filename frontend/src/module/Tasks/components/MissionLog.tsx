import { formatMoney, StatusBadge } from "../../../test";
import { Layers3, Play, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useTaskContext } from "@/AppContext";

const MissionLog = () => {
  const { taskData } = useTaskContext();
  return (
    <div className="xl:col-span-8 space-y-8">
      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Mission Log</h3>
            <p className="text-slate-500 text-sm mt-1">
              Real-time task execution status
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending
              </span>
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="space-y-2 max-h-[700px] overflow-auto p-4 custom-scrollbar">
            {taskData.tasks.map((task: any) => {
              const agentIdField = (task.agentId && typeof task.agentId === 'object') 
                ? (task.agentId.id || task.agentId._id) 
                : task.agentId;
                
              const agent = taskData.agents.find(
                (a: any) => (a.id || a._id) === agentIdField
              ) || (task.agentId && typeof task.agentId === 'object' ? task.agentId : null);
              return (
                <div
                  key={task.id || task._id}
                  onClick={() => taskData.setSelectedTaskId(task.id || task._id)}
                  className={`group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-[28px] border-2 transition-all duration-400 cursor-pointer ${
                    taskData.selectedTaskId === (task.id || task._id)
                      ? "border-slate-900 bg-slate-50 shadow-xl shadow-slate-200/50 -translate-y-1"
                      : "border-transparent hover:border-slate-100 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-slate-950 transition-colors">
                        {task.title}
                      </h4>
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="flex items-center gap-5 text-sm text-slate-500">
                      <span className="flex items-center gap-2 font-semibold">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Layers3 className="w-3.5 h-3.5" />
                        </div>
                        {agent?.name || "AI Agent"}
                      </span>
                      <span className="flex items-center gap-2 font-semibold">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right hidden xl:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Resources Used
                      </p>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {task.totalTokens?.toLocaleString() || 0} tokens
                      </p>
                      <p className="text-xs font-bold text-emerald-600">
                        {formatMoney(task.estimatedCost)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {task.status !== "completed" && task.status !== "running" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            taskData.runMockTask(task.id || task._id);
                          }}
                          className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-slate-900/10"
                        >
                          <Play className="w-5 h-5 fill-current" />
                        </button>
                      )}

                      {task.status === "completed" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            taskData.setSelectedTaskId(task.id || task._id);
                          }}
                          className="px-5 py-2.5 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center gap-2 font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all group/btn"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>View Result</span>
                        </button>
                      )}

                      {task.status === "failed" && (
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {taskData.tasks.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                  <Layers3 className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-slate-400 font-medium">
                  No missions launched yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionLog;
