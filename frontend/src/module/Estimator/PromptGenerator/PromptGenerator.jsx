import { PromptGeneratorHeader } from "../../../utils/Header";
import { ChipMainStyle } from "../../../assets/models";
import Description from "./ui/Description";
import Generatebutton from "./ui/Generatebutton";
import Generatedoutput from "./ui/Generatedoutput";
import { useEstimatorContext } from "@/AppContext";
import Error from "../../../utils/Error";

const PromptGenerator = () => {
  const { usePromptGen } = useEstimatorContext();

  return (
    <div className={ChipMainStyle}>
      <PromptGeneratorHeader />
      <Description usePromptGen={usePromptGen} />
      <Error
        error={usePromptGen.error}
        onClear={() => usePromptGen.handleClearError()}
      />
      <Generatebutton usePromptGen={usePromptGen} />
      <Generatedoutput usePromptGen={usePromptGen} />
    </div>
  );
};

export default PromptGenerator;
