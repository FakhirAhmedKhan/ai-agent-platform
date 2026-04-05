import { formatMoney, StatusBadge } from "../../../test";
import { Play } from "lucide-react";
import { useDashBoardContext } from "@/AppContext";

const TaskDetail = () => {
  const context = useDashBoardContext();
  const dashBoardData = context?.dashBoardData;
  const selectedAgentId = dashBoardData?.selectedAgentId;
  const taskAgentId =
    dashBoardData?.selectedTask?.agentId?._id ||
    dashBoardData?.selectedTask?.agentId;
  const isCorrectAgent =
    !selectedAgentId || String(taskAgentId) === String(selectedAgentId);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5">
        <div>
          <p className="text-sm text-slate-500">Tasks</p>
          <h3 className="text-xl font-bold mt-1">
            {selectedAgentId ? (
              <>
                <span className="text-slate-400 font-normal mr-1">
                  History for
                </span>
                {(dashBoardData?.agents || []).find(
                  (a: any) => (a.id || a._id) === selectedAgentId,
                )?.name || "Agent"}
              </>
            ) : (
              "Global Task History"
            )}
          </h3>
        </div>
        {dashBoardData?.selectedTask && isCorrectAgent && (
          <div key={dashBoardData?.selectedTask?.id} className="mt-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Task detail</p>
                <h3 className="text-xl font-bold mt-1">
                  {dashBoardData.selectedTask?.title}
                </h3>
              </div>
              {dashBoardData?.selectedTask && (
                <StatusBadge status={dashBoardData?.selectedTask?.status} />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Input
              </p>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 mt-2">
                {dashBoardData?.selectedTask?.input}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Output
              </p>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 mt-2 min-h-[140px]">
                {dashBoardData?.selectedTask?.output || "No output yet."}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Prompt tokens</p>
                <p className="font-semibold mt-1">
                  {dashBoardData?.selectedTask?.promptTokens}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Output tokens</p>
                <p className="font-semibold mt-1">
                  {dashBoardData?.selectedTask?.outputTokens}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Total tokens</p>
                <p className="font-semibold mt-1">
                  {dashBoardData?.selectedTask?.totalTokens}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Estimated cost</p>
                <p className="font-semibold mt-1">
                  {formatMoney(dashBoardData?.selectedTask?.estimatedCost)}
                </p>
              </div>
            </div>

            {dashBoardData?.selectedTask?.status !== "completed" && (
              <button
                onClick={() =>
                  dashBoardData?.runMockTask?.(dashBoardData?.selectedTask?.id)
                }
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white px-4 py-3 font-medium"
              >
                <Play className="w-4 h-4" />
                Run mock task
              </button>
            )}

            {dashBoardData.selectedTask.errorMessage && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {dashBoardData.selectedTask.errorMessage}
              </div>
            )}
          </div>
        )}
      </div>

      {!dashBoardData?.selectedTask && selectedAgentId && (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-12 text-center text-slate-400">
          <p>This agent has no execution history yet or no task is selected.</p>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
