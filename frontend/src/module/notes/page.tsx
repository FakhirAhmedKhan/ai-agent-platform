import { Suspense } from "react";
import { NoteHeader, CreateNote, ReadNote } from "../index";
import SkeletonLoader from "../../utils/SkeletonLoader";

const NotePage = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <NoteHeader />
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          <CreateNote />
          <ReadNote />
        </div>
      </div>
    </Suspense>
  );
};

export default NotePage;
