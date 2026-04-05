const ModelGrid = ({ allModels, selected, toggle, cheapestKey }) => {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        Select Models
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {allModels.map(({ company, name }) => {
          const key = `${company}||${name}`;
          const active = selected.includes(key);
          const isCheapest = key === cheapestKey;
          return (
            <button
              key={key}
              id={`cmp-model-${key.replace(/[^a-z0-9]/gi, "-")}`}
              onClick={() => toggle(key)}
              className={`relative text-left rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer
                ${
                  active
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-sm"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700"
                }`}
            >
              {isCheapest && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                  CHEAPEST
                </span>
              )}
              <div className="font-semibold truncate">{name}</div>
              <div className="text-gray-400 dark:text-gray-500 truncate">
                {company}
              </div>
              {active && (
                <span className="absolute top-2 right-2 text-indigo-500 dark:text-indigo-400 text-sm">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModelGrid;
