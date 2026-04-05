import { Outlet } from "react-router-dom";
import WebSideBar from "../WebSideBar";
import { Suspense } from "react";
import { SkeletonLoader } from "@/module";

const AppLayout = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="flex min-h-screen">
          <WebSideBar />
          <main className="flex-1 p-4 sm:p-6 lg:p-10 mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default AppLayout;
