const COMPLEXITY_LEVELS = ["Simple", "Moderate", "Complex"];

const ComplexitySelecter = ({ useCostEst }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
        Project Complexity
      </label>
      <div className="grid grid-cols-3 gap-3">
        {COMPLEXITY_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => {
              useCostEst.setComplexity(level);
              useCostEst.setResults(null);
            }}
            className={`py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              useCostEst.complexity === level
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComplexitySelecter;

