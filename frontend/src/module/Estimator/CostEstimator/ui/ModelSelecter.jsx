const ModelSelecter = ({ useCostEst }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
        Model
      </label>
      <div className="relative">
        <select
          value={useCostEst.model}
          disabled={!useCostEst.company}
          onChange={(e) => {
            useCostEst.handleModelChange(e.target.value);
            useCostEst.setResults(null);
          }}
          className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" disabled>
            {useCostEst.company ? "Select a model…" : "Select a company first…"}
          </option>
          {useCostEst.modelNames.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default ModelSelecter;

