import { useState, useCallback, useMemo } from "react";
import { countWords } from "../../../../assets/models";

export const useWordCounter = (onSyncWords, setResults) => {
  const [promptText, setPromptText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handlePromptGenerated = useCallback(
    (text) => {
      const trimmed = text.trim();
      const count = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
      setPromptText(text);
      setWordCount(count);
      setCharCount(text.length);
      if (onSyncWords) onSyncWords(String(count));
    },
    [onSyncWords],
  );

  const handleChange = useCallback(
    (e) => {
      const text = e.target.value;
      setPromptText(text);
      const count = countWords(text);
      setWordCount(count);
      setCharCount(text.length);
      if (onSyncWords) onSyncWords(String(count));
    },
    [onSyncWords],
  );

  const handleClear = useCallback(() => {
    setPromptText("");
    setWordCount(0);
    setCharCount(0);
    if (onSyncWords) onSyncWords("");
    if (setResults) setResults(null);
  }, [onSyncWords, setResults]);

  return useMemo(() => ({
    useWordCou: {
      promptText,
      wordCount,
      charCount,
      setPromptText,
      setWordCount,
      setCharCount,
      handleChange,
      handleClear,
      handlePromptGenerated,
    },
  }), [promptText, wordCount, charCount, handleChange, handleClear, handlePromptGenerated]);
};
