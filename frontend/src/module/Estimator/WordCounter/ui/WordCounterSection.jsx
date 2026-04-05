import { useWordCounter } from "../hook/useWordCounter";

// Sub-component: only mounts context subscription when actually rendering the word counter
 const WordCounterSection = ({ useWordCou: propUseWordCou }) => {
  const { useWordCou: internalUseWordCou } = useWordCounter();
  const useWordCou = propUseWordCou || internalUseWordCou;

  return (
    <div className="flex flex-col gap-2">
      {useWordCou.promptText && (
        <button
          onClick={useWordCou.handleClear}
          className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors font-medium"
        >
          Clear
        </button>
      )}
      <textarea
        id="prompt-textarea"
        rows={5}
        value={useWordCou.promptText}
        onChange={useWordCou.handleChange}
        placeholder="Type or paste your AI prompt here…"
        className="w-full resize-y bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all placeholder-gray-400 dark:placeholder-gray-600"
      />
    </div>
  );
};
export default WordCounterSection;