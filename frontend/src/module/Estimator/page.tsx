import { Suspense } from "react";
import { ChipMainStyle, MainSection } from "../../assets/models";
import {
  PromptGenerator,
  WordCounter,
  CostEstimator,
  ModelComparison,
} from "../index";
import SkeletonLoader from "../../utils/SkeletonLoader";

function CostingPage() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className={MainSection}>
        <main className="flex-1 flex flex-col items-center justify-start px-2 pt-2 sm:pt-2 gap-10">
          <div className="w-full max-w-8xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-6">
              <PromptGenerator />
              <WordCounter />
            </div>
            <CostEstimator />
          </div>
          <div className="w-full max-w-6xl">
            <div className={ChipMainStyle}>
              <ModelComparison />
            </div>
          </div>
        </main>

        <footer className="text-center py-10 px-4">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            ⚠️ This is an estimate based on simplified token assumptions.
          </p>
        </footer>
      </div>
    </Suspense>
  );
}
export default CostingPage;
