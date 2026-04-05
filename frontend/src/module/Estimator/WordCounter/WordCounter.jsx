import { ChipMainStyle } from "../../../assets/models";
import StatsRow from "./ui/StatsRow";
import { WordCounterHeader } from "../../../utils/Header";
import { useEstimatorContext } from "@/AppContext";
import WordCounterSection from "./ui/WordCounterSection";

const WordCounter = () => {
  const { useWordCou } = useEstimatorContext();

  return (
    <div className={ChipMainStyle}>
      <WordCounterHeader />
      <WordCounterSection useWordCou={useWordCou} />
      <StatsRow useWordCou={useWordCou} />
    </div>
  );
};

export default WordCounter;
