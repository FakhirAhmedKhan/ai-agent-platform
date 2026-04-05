import React from "react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = "default", // default | chip | iconBox | simple
  className = "",
}) => {
  if (variant === "chip") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-800 ${className}`}
      >
        {Icon && <Icon className="w-4 h-4 text-slate-900" />}
        {title}
      </div>
    );
  }

  if (variant === "iconBox") {
    return (
      <div
        className={`rounded-2xl bg-slate-50 p-3 border border-slate-100 flex items-center justify-center text-slate-900 ${className}`}
      >
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div className={`space-y-1 ${className}`}>
        {title && <h1 className="text-2xl font-bold text-slate-900 leading-tight">{title}</h1>}
        {value && <p className="text-sm text-slate-500 font-medium">{value}</p>}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 ${className}`}
    >
      {title && (
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
          {title}
        </p>
      )}

      {Icon && (
        <div className="flex justify-start mb-2">
            <Icon className="w-5 h-5 text-slate-900" />
        </div>
      )}

      {value && (
        <p className="text-xl font-bold text-slate-900 break-words">{value}</p>
      )}
    </div>
  );
};

export default StatCard;
