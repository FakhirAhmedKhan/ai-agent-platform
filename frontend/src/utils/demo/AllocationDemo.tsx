import { TrendingUp, ArrowUpRight } from "lucide-react";
import { formatMoney } from "../../test";
import { useUsageContext } from "@/AppContext";

const AllocationDemo = () => {
  const { usageData } = useUsageContext();
  return (
    <div className="lg:col-span-4 space-y-8">
      <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-xl shadow-indigo-200">
        <div className="flex items-center justify-between mb-8">
          <TrendingUp className="w-8 h-8 text-indigo-200" />
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
            Growth
          </span>
        </div>
        <h4 className="text-2xl font-bold">Predictive Scaling</h4>
        <p className="text-indigo-100 mt-2 text-sm leading-relaxed">
          Based on current usage patterns, you are projected to use 45,000 more
          tokens this week.
        </p>
        <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">
              Avg Cost/Task
            </p>
            <p className="text-xl font-bold mt-1">
              {formatMoney(usageData.avgCostPerTask)}
            </p>
          </div>
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 p-8 bg-white space-y-6">
        <h4 className="font-bold text-slate-900">Billing Alerts</h4>
        <div className="space-y-4">
          {[
            { label: "Token Limit (80%)", status: "ok" },
            { label: "Daily Budget", status: "warning" },
            { label: "High Volume Run", status: "ok" },
          ].map((alert, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50"
            >
              <span className="text-sm font-bold text-slate-700">
                {alert.label}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${alert.status === "ok" ? "bg-emerald-500" : "bg-amber-500"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllocationDemo;
