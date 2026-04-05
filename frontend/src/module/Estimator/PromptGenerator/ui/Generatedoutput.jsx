const Generatedoutput = ({ usePromptGen }) => {
  return (
    usePromptGen.generatedPrompt && (
      <div className="flex flex-col gap-3 animate-fade-in">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Generated Prompt
          </span>
          <div className="flex gap-2">
            <button
              onClick={usePromptGen.handleCopy}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium transition-all"
            >
              {usePromptGen.copied ? "✓ Copied!" : "Copy"}
            </button>
            <button
              onClick={() =>
                usePromptGen.handlePromptGenerated(usePromptGen.generatedPrompt)
              }
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 text-indigo-600 dark:text-indigo-400 font-medium transition-all"
            >
              Use in Counter
            </button>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {usePromptGen.generatedPrompt}
        </div>
      </div>
    )
  );
};

export default Generatedoutput;

