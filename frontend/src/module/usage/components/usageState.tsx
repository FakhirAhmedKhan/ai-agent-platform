import { StatCard } from "../../../test";
import { Activity, Zap, CircleDollarSign } from "lucide-react";
import { formatMoney } from "../../../test";
import { useUsageContext } from "@/AppContext";

const UsageState = () => {
  const { usageData } = useUsageContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Consumption"
        value={usageData.totalTokens.toLocaleString()}
        hint="Tokens used across all agents"
        icon={Activity}
      />
      <StatCard
        title="Cumulative Cost"
        value={formatMoney(usageData.totalCost)}
        hint="Estimated based on mock rates"
        icon={CircleDollarSign}
      />
      <StatCard
        title="Efficiency Rate"
        value={`${((1 - usageData.totalCost / (usageData.totalTokens * 0.001 || 1)) * 100).toFixed(1)}%`}
        hint="Optimization vs baseline"
        icon={Zap}
      />
    </div>
  );
};

export default UsageState;
