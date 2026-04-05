import { ChipMainStyle } from "../../../assets/models";
import { CostEstimatorHeader } from "../../../utils/Header";
import Error from "../../../utils/Error";
import CompanySelecter from "./ui/CompanySelecter";
import ModelSelecter from "./ui/ModelSelecter";
import ComplexitySelecter from "./ui/ComplexitySelecter";
import ActionButtons from "./ui/ActionButtons";
import ResultsArea from "./ui/ResultsArea";
import SysnicWordCount from "./ui/SysnicWordCount";
import { useEstimatorContext } from "@/AppContext";

const CostEstimator = () => {
  const { useCostEst } = useEstimatorContext();

  return (
    <div className={ChipMainStyle}>
      <CostEstimatorHeader />
      <CompanySelecter useCostEst={useCostEst} />
      <ModelSelecter useCostEst={useCostEst} />
      <SysnicWordCount useCostEst={useCostEst} />
      <ComplexitySelecter useCostEst={useCostEst} />
      <Error error={useCostEst.error} onClear={useCostEst.handleClearError} />
      <ActionButtons useCostEst={useCostEst} />
      <ResultsArea useCostEst={useCostEst} />
    </div>
  );
};

export default CostEstimator;
