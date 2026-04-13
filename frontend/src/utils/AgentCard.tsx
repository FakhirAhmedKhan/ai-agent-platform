import { Bot } from "lucide-react";
import { StatusBadge } from "../test";

export function AgentCard({ agent, selected }) {
  const baseCard =
    "w-full text-left rounded-3xl p-6 border transition-all shadow-sm";
  const selectedCard = "bg-slate-900 text-white border-slate-900 shadow-lg";
  const normalCard = "bg-white border-slate-200 hover:border-slate-300";

  const sectionBox = selected
    ? "rounded-2xl p-4 bg-white/10"
    : "rounded-2xl p-4 bg-slate-50";

  const labelText = selected
    ? "text-slate-300 text-xs"
    : "text-slate-500 text-xs";
  const valueText = selected
    ? "font-semibold mt-1 text-white"
    : "font-semibold mt-1 text-slate-900";

  return (
    <button
      className={`${baseCard} ${selected ? selectedCard : normalCard}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">{agent.name}</h3>
            <StatusBadge status={agent.status} />
          </div>
          <p className={`text-sm mt-2 ${labelText}`}>{agent.role}</p>
        </div>

        <div
          className={
            selected
              ? "rounded-2xl p-3 bg-white/10"
              : "rounded-2xl p-3 bg-slate-100"
          }
        >
          <Bot
            className={
              selected ? "w-5 h-5 text-white" : "w-5 h-5 text-slate-700"
            }
          />
        </div>
      </div>

      {/* Model + Tokens */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className={sectionBox}>
          <p className={labelText}>Model</p>
          <p className={valueText}>{agent.model}</p>
        </div>

        <div className={sectionBox}>
          <p className={labelText}>Tokens</p>
          <p className={valueText}>{agent.maxTokens.toLocaleString()}</p>
        </div>
      </div>

      {/* Extra Details */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className={sectionBox}>
          <p className={labelText}>Temperature</p>
          <p className={valueText}>{agent.temperature}</p>
        </div>

        <div className={sectionBox}>
          <p className={labelText}>Max Tokens</p>
          <p className={valueText}>{agent.maxTokens}</p>
        </div>

        <div className={sectionBox}>
          <p className={labelText}>Memory</p>
          <p className={valueText}>
            {agent.memoryEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>

        <div className={sectionBox}>
          <p className={labelText}>Last Run</p>
          <p className={`${valueText} text-sm`}>{agent.lastRun}</p>
        </div>
      </div>
    </button>
  );
}
