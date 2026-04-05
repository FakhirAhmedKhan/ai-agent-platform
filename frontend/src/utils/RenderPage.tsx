import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";

const RenderPage = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Outlet />
    </Suspense>
  );
};

export default RenderPage;
