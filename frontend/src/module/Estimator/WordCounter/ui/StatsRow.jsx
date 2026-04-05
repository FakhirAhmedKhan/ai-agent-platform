import { useWordCounter } from "../hook/useWordCounter";

const StatsRow = ({ useWordCou: propUseWordCou }) => {

  const { useWordCou: internalUseWordCou } = useWordCounter();
  const useWordCou = propUseWordCou || internalUseWordCou;

  return (
    <div className="flex items-center gap-4">
      {/* Word count pill */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
          useWordCou.wordCount > 0
            ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
            : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400"
        }`}
      >
        <span>💬</span>
        <span>
          {useWordCou.wordCount} {useWordCou.wordCount === 1 ? "word" : "words"}
        </span>
      </div>

      {/* Char count pill */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400">
        <span>🔡</span>
        <span>{useWordCou.charCount} chars</span>
      </div>

      {/* Live synced badge */}
      <div className="ml-auto flex items-center gap-3">
        {useWordCou.promptText && (
          <button
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(useWordCou.promptText);
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(utterance);
            }}
            className="text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-all font-medium"
            title="Read prompt aloud"
          >
            <span>🔊</span> Listen
          </button>
        )}
        {useWordCou.wordCount > 0 && (
          <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium animate-fade-in">
            ✓ Synced to estimator
          </span>
        )}
      </div>

    </div>
  );
};


export default StatsRow;
