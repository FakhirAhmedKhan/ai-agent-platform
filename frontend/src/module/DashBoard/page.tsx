import {
  DashboardState,
  AgentSelector,
  ExecutionHistory,
  TaskDetail,
  AiProviderName
} from "../index";

const DashboardPage = () => {
  return (
    <>
      <AiProviderName />
      <DashboardState />
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pb-10 w-full">
        <div className="lg:col-span-12">
          <AgentSelector />
        </div>
        <div className="lg:col-span-7">
          <ExecutionHistory />
        </div>
        <div className="lg:col-span-5">
          <TaskDetail />
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
