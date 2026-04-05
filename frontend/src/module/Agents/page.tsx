import { memo } from "react";
import { AgentHeader, ShowForm, AgentShow, DemoPartAgent } from "../index";

const AgentsPage = memo(() => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
        <div className="lg:col-span-4 space-y-4">
          <AgentHeader />
          <ShowForm />
          <AgentShow />
        </div>
        <div className="lg:col-span-2">
          <DemoPartAgent />
        </div>
      </div>
    </div>
  );
});

export default AgentsPage;
