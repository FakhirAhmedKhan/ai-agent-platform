const Description = ({ usePromptGen }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
        What do you want to build?
      </label>
      <textarea
        id="prompt-description"
        rows={3}
        value={usePromptGen.description}
        onChange={(e) => {
          usePromptGen.setDescription(e.target.value);
          if (usePromptGen.setError) usePromptGen.setError("");
        }}
        placeholder="e.g. A customer support chatbot for an e-commerce store that handles returns and FAQs…"
        disabled={usePromptGen.isLoading}
        className="w-full resize-y bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all placeholder-gray-400 dark:placeholder-gray-600 disabled:opacity-50"
      />
    </div>
  );
};

export default Description;

