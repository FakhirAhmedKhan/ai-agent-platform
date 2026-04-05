import { useState, useCallback, useMemo } from "react";
import { generatePrompt } from "./gemini";

export const usePromptGenerator = (onPromptGenerated) => {
  const [description, setDescription] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = useCallback(async () => {
    if (!description.trim()) {
      setError("Please describe what you want to build.");
      return;
    }

    setError("");
    setIsLoading(true);
    setGeneratedPrompt("");

    try {
      const result = await generatePrompt(description);
      setGeneratedPrompt(result);
      onPromptGenerated?.(result);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [description, onPromptGenerated]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }, [generatedPrompt]);

  const handleClearError = useCallback(() => setError(""), []);

  return useMemo(() => ({
    usePromptGen: {
      description,
      setDescription,
      generatedPrompt,
      isLoading,
      copied,
      error,
      setError,
      handleGenerate,
      handleCopy,
      handleClearError,
      handlePromptGenerated: onPromptGenerated,
    },
  }), [description, generatedPrompt, isLoading, copied, error, handleGenerate, handleCopy, handleClearError, onPromptGenerated]);
};
