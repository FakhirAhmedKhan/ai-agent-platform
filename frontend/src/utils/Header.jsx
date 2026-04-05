const Header = ({ title, description, icon }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <span className="text-2xl">{icon}</span> {title}
      </h2>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
        {description}
      </p>
    </div>
  );
};

export { Header };

export const CostEstimatorHeader = () => (
  <Header
    title="Cost Estimator"
    description="Estimate the cost of your AI project"
    icon="💰"
  />
);
export const ModelComparionHeader = () => (
  <Header
    title="Model Comparion"
    description="Compare the cost of different AI models"
    icon="⚖️"
  />
);
export const PromptGeneratorHeader = () => (
  <Header
    title="Prompt Generator"
    description="Generate the optimized prompt for your AI project"
    icon="✨"
  />
);
export const WordCounterHeader = () => (
  <Header
    title="Word Counter"
    description="Count the number of words in your prompt"
    icon="📝"
  />
);
