const Generatebutton = ({ usePromptGen }) => {
  return (
    <button
      id="generate-prompt-btn"
      onClick={usePromptGen.handleGenerate}
      disabled={usePromptGen.isLoading || !usePromptGen.description.trim()}
      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-700 dark:disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center justify-center gap-2"
    >
      {usePromptGen.isLoading ? (
        <>
          <svg
            className="animate-spin w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <span>✨</span>
          <span>Generate Polished Prompt</span>
        </>
      )}
    </button>
  );
};

export default Generatebutton;
