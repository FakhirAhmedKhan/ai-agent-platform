import { Suspense } from "react";
import { NewTask, MissionLog, TaskOutput } from "../index";
import SkeletonLoader from "../../utils/SkeletonLoader";

const TasksPage = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <NewTask />
        <MissionLog />
        <TaskOutput />
      </div>
    </Suspense>
  );
};

export default TasksPage;
