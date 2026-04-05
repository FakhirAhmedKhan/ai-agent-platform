import {
  Clock3,
  Play,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
} from "lucide-react";

export function formatMoney(value: number) {
  return `$${value.toFixed(3)}`;
}

export function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    running: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    failed: "bg-rose-100 text-rose-700 border-rose-200",
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    paused: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const icons = {
    pending: <Clock3 className="w-3.5 h-3.5" />,
    running: <Play className="w-3.5 h-3.5" />,
    completed: <CheckCircle2 className="w-3.5 h-3.5" />,
    failed: <AlertCircle className="w-3.5 h-3.5" />,
    active: <Sparkles className="w-3.5 h-3.5" />,
    paused: <PauseCircle className="w-3.5 h-3.5" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

export function StatCard({ title, value, hint, icon }) {
  const Icon = icon;
  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
          <p className="text-sm text-slate-500 mt-2">{hint}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <Icon className="w-5 h-5 text-slate-700" />
        </div>
      </div>
    </div>
  );
}

export function TaskRow({ task, agentName, onSelect, selected }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full grid grid-cols-12 gap-3 px-4 py-4 text-left border-b border-slate-100 transition ${
        selected ? "bg-slate-50" : "hover:bg-slate-50/70"
      }`}
    >
      <div className="col-span-4">
        <p className="font-semibold text-slate-900 truncate">{task.title}</p>
        <p className="text-xs text-slate-500 mt-1">{agentName}</p>
      </div>
      <div className="col-span-2 flex items-center">
        <StatusBadge status={task.status} />
      </div>
      <div className="col-span-2 text-sm text-slate-600 flex items-center">
        {task.totalTokens.toLocaleString()}
      </div>
      <div className="col-span-2 text-sm text-slate-600 flex items-center">
        {formatMoney(task.estimatedCost)}
      </div>
      <div className="col-span-2 text-sm text-slate-500 flex items-center justify-end">
        {task.createdAt}
      </div>
    </button>
  );
}
