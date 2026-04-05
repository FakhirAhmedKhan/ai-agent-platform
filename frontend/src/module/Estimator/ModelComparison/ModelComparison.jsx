import { ModelComparionHeader } from "../../../utils/Header";
import { useEstimatorContext } from "@/AppContext";
import InputsRow from "./ui/InputsRow";
import ModelGrid from "./ui/ModelGrid";
import ResultsTable from "./ui/ResultsTable";

const ModelComparison = () => {
  const { useModelComp } = useEstimatorContext();

  return (
    <div className="flex flex-col gap-5">
      <ModelComparionHeader />

      <InputsRow
        words={useModelComp.words}
        setWords={useModelComp.setWords}
        complexity={useModelComp.complexity}
        setComplexity={useModelComp.setComplexity}
        multipliers={useModelComp.COMPLEXITY_MULTIPLIERS}
      />

      <ModelGrid
        allModels={useModelComp.allModels}
        selected={useModelComp.selected}
        toggle={useModelComp.toggle}
        cheapestKey={useModelComp.cheapestKey}
      />

      {useModelComp.hasResults ? (
        <ResultsTable results={useModelComp.results} />
      ) : (
        useModelComp.selected.length > 0 &&
        useModelComp.words === "" && (
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 py-2">
            Enter a word count above to see cost comparisons.
          </p>
        )
      )}
    </div>
  );
};

export default ModelComparison;
