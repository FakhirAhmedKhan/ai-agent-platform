import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full space-y-6 animate-pulse p-4 lg:p-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-10">
        <div className="h-10 bg-slate-200 rounded-lg w-1/3"></div>
        <div className="h-10 bg-slate-200 rounded-lg w-24"></div>
      </div>

      {/* Grid for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-24 bg-slate-50 rounded-xl"></div>
            <div className="h-10 bg-slate-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>

      {/* Table/List Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-slate-100 rounded-full"></div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="h-4 bg-slate-100 rounded"></div>
                <div className="h-4 bg-slate-100 rounded"></div>
                <div className="h-4 bg-slate-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
