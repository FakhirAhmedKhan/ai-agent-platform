import { StatCard } from "../../../test";
import { Bot, CheckCircle2, Sparkles, CircleDollarSign } from "lucide-react";
import { formatMoney } from "../../../test";
import { useDashBoardContext } from "@/AppContext";

const DashboardState = () => {
  const context = useDashBoardContext();
  const dashBoardData = context?.dashBoardData;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total agents"
        value={dashBoardData?.agents?.length || 0}
        hint="Specialized AI workers"
        icon={Bot}
      />
      <StatCard
        title="Completed tasks"
        value={dashBoardData?.completedTasks || 0}
        hint={`${dashBoardData?.runningTasks || 0} task(s) currently running`}
        icon={CheckCircle2}
      />
      <StatCard
        title="Total tokens"
        value={(dashBoardData?.totalTokens || 0).toLocaleString()}
        hint="Accumulated mock usage"
        icon={Sparkles}
      />
      <StatCard
        title="Estimated cost"
        value={formatMoney(dashBoardData?.totalCost || 0)}
        hint="Calculated with fake pricing"
        icon={CircleDollarSign}
      />
    </section>
  );
};

export default DashboardState;
