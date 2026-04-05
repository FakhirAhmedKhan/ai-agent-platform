const SysnicWordCount = ({ useCostEst }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
        Prompt Word Count
      </label>
      <input
        id="prompt-words"
        type="number"
        min="1"
        value={useCostEst.words}
        onChange={(e) => {
          useCostEst.handleWordsChange(e.target.value);
          useCostEst.setResults(null);
          if (useCostEst.setError) useCostEst.setError("");
        }}
        placeholder="Enter prompt words or use the counter above"
        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all placeholder-gray-400 dark:placeholder-gray-600"
      />
      {useCostEst.words && Number(useCostEst.words) > 0 && (
        <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">
          ✓ {Number(useCostEst.words).toLocaleString()} words auto-synced from
          prompt counter
        </p>
      )}
    </div>
  );
};

export default SysnicWordCount;

