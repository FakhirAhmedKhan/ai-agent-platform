import { Layers3, Play, Send } from "lucide-react";
import { useTaskContext } from "@/AppContext";

const NewTask = () => {
  const { taskData } = useTaskContext();
  return (
    <div className="xl:col-span-4 space-y-8">
      <div className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">New Mission</h3>
            <p className="text-sm text-slate-500">Configure task parameters</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
              Mission Title
            </label>
            <input
              value={taskData.taskForm.title}
              onChange={(e) =>
                taskData.setTaskForm({ ...taskData.taskForm, title: e.target.value })
              }
              placeholder="e.g. Analyze market trends"
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
              Select Agent
            </label>
            <div className="grid grid-cols-1 gap-2">
              {taskData.agents.map((agent: any) => (
                <button
                  key={agent.id}
                  onClick={() =>
                    taskData.setTaskForm({ ...taskData.taskForm, agentId: agent.id })
                  }
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    taskData.taskForm.agentId === agent.id
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      taskData.taskForm.agentId === agent.id ? "bg-white/10" : "bg-white"
                    }`}
                  >
                    <Layers3 className="w-5 h-5 text-inherit" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{agent.name}</p>
                    <p
                      className={`text-xs ${taskData.taskForm.agentId === agent.id ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {agent.model}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
              Input Data / Prompt
            </label>
            <textarea
              rows={5}
              value={taskData.taskForm.input}
              onChange={(e) =>
                taskData.setTaskForm({ ...taskData.taskForm, input: e.target.value })
              }
              placeholder="Provide details for the task..."
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-medium resize-none text-sm leading-relaxed"
            />
          </div>

          <button
            onClick={taskData.createTask}
            disabled={taskData.loading}
            className={`w-full py-4 rounded-2xl bg-slate-950 text-white font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.01] active:scale-95 transition-all text-lg flex items-center justify-center gap-3 ${
              taskData.loading ? "opacity-70 cursor-not-allowed scale-[0.98]" : ""
            }`}
          >
            {taskData.loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Play className="w-5 h-5 fill-current" />
            )}
            {taskData.loading ? "Preparing Agent..." : "Launch Mission"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
