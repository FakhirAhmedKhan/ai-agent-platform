const ActionButtons = ({ useCostEst }) => {
  return (
    <div className="flex gap-3 pt-1">
      <button
        id="calculate-btn"
        onClick={useCostEst.handleCalculate}
        disabled={!useCostEst.canCalculate}
        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 text-sm"
      >
        ✦ Calculate Cost
      </button>
      <button
        id="reset-btn"
        onClick={useCostEst.handleReset}
        className="px-5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
      >
        Reset
      </button>
    </div>
  );
};

export default ActionButtons;

