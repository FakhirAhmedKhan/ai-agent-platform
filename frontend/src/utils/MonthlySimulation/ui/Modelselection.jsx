import React from "react";

export const Modelselection = ({
  company,
  setCompany,
  model,
  setModel,
  modelNames,
  companies,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Company
        </label>
        <select
          id="sim-company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            setModel("");
          }}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
        >
          <option value="" disabled>
            Select…
          </option>
          {companies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Model
        </label>
        <select
          id="sim-model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!company}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer disabled:opacity-40"
        >
          <option value="" disabled>
            Select…
          </option>
          {modelNames.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
