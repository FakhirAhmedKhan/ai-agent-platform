import { Suspense } from "react";
import { AgentAllocation, AllocationDemo, UsageState } from "../index";
import SkeletonLoader from "../../utils/SkeletonLoader";

const UsagePage = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <UsageState />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <AgentAllocation />
          <AllocationDemo />
        </div>
      </div>
    </Suspense>
  );
};

export default UsagePage;
