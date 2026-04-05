const Error = ({ error, onClear }) => {
  if (!error) return null;
  return (
    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium">
      <span>⚠️</span>
      <span className="flex-1">{error}</span>
      {onClear && (
        <button
          onClick={onClear}
          className="ml-2 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-800/60 px-2 py-0.5 rounded text-[10px] transition-all"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Error;
