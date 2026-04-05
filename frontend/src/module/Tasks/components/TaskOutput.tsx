import {
  CheckCircle2,
  Clock,
  Cpu,
  DollarSign,
  Layers3,
  Terminal,
  X,
} from "lucide-react";
import { formatMoney, StatusBadge } from "../../../test";
import { useTaskContext } from "@/AppContext";

const TaskOutput = () => {
  const { taskData } = useTaskContext();
  const task = taskData.selectedTask;

  if (!task) return null;

  const agent =
    task.agentId && typeof task.agentId === "object"
      ? task.agentId
      : taskData.agents.find((a: any) => (a.id || a._id) === task.agentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center shadow-lg shadow-slate-200">
              <Terminal className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-slate-900">
                  {task.title}
                </h3>
                <StatusBadge status={task.status} />
              </div>
              <p className="text-slate-500 font-medium">
                Mission Execution Results
              </p>
            </div>
          </div>
          <button
            onClick={() => taskData.setSelectedTaskId(null)}
            className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Layers3 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Agent
                </span>
              </div>
              <p className="font-bold text-slate-900">
                {agent?.name || "AI Agent"}
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Tokens
                </span>
              </div>
              <p className="font-bold text-slate-900">
                {task.totalTokens?.toLocaleString()}
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Cost
                </span>
              </div>
              <p className="font-bold text-emerald-600">
                {formatMoney(task.estimatedCost)}
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Time
                </span>
              </div>
              <p className="font-bold text-slate-900">
                {new Date(task.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Prompt Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] pl-2">
                Input Prompt
              </label>
            </div>
            <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed font-medium">
              {task.input}
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] pl-2">
                Output Result
              </label>
              {task.status === "completed" && (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Response
                </div>
              )}
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-[36px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative p-8 rounded-[32px] bg-white border border-slate-100 text-slate-900 leading-relaxed min-h-[200px] shadow-sm">
                <div className="prose prose-slate max-w-none">
                  {task.status === "running" ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                      <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
                      <p className="text-slate-500 font-bold animate-pulse">Agent is thinking...</p>
                    </div>
                  ) : task.output ? (
                    <div className="whitespace-pre-wrap">{task.output}</div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400 italic text-center">
                      <p className="mb-2">No output generated for this task status: <span className="font-bold uppercase">{task.status}</span></p>
                      {task.errorMessage && (
                        <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 not-italic w-full">
                          <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">Error Details</p>
                          <p className="font-bold text-sm">{task.errorMessage}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              ID: {task._id || task.id}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              Model: {agent?.model || "Standard"}
            </span>
          </div>
          <div className="flex gap-3">
            {task.status === "running" && (
              <button
                onClick={() => taskData.mutateStop(task._id || task.id).then(() => taskData.setSelectedTaskId(null))}
                className="px-8 py-3.5 rounded-2xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-all border border-rose-200 active:scale-95 flex items-center justify-center min-w-[140px]"
              >
                {taskData.isLoading ? (
                  <div className="w-5 h-5 border-2 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
                ) : "Stop Task"}
              </button>
            )}
            <button
              onClick={() => taskData.setSelectedTaskId(null)}
              className="px-8 py-3.5 rounded-2xl bg-slate-950 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
            >
              Close Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOutput;
