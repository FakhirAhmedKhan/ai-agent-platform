import ResultCard from "../../../../utils/ResultCard";
import models from "../../../../assets/models";

const ResultsArea = ({ useCostEst }) => {

  if (!useCostEst.results) return null;

  const pricing = models[useCostEst.company]?.[useCostEst.model];

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 text-center tracking-tight">
        📊 Estimation Results
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <ResultCard
          label="Input Tokens"
          value={useCostEst.results.inputTokens.toLocaleString()}
          icon="📥"
          accent="blue"
        />
        <ResultCard
          label="Output Tokens"
          value={useCostEst.results.outputTokens.toLocaleString()}
          icon="📤"
          accent="purple"
        />
        <ResultCard
          label="Total Tokens"
          value={useCostEst.results.totalTokens.toLocaleString()}
          icon="🔢"
          accent="emerald"
        />
        <ResultCard
          label="Estimated Cost"
          value={`$${useCostEst.results.finalCost.toFixed(6)}`}
          icon="💰"
          accent="amber"
        />
      </div>
      {pricing && (
        <div className="text-center text-xs text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
          <span className="font-medium">
            {useCostEst.company} · {useCostEst.model}
          </span>
          &nbsp;·&nbsp; Input: ${pricing.inputCostPer1M}/1M · Output: $
          {pricing.outputCostPer1M}/1M
        </div>
      )}
    </div>
  );
};

export default ResultsArea;

