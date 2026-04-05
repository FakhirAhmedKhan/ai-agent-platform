import { useState, useCallback, useMemo } from "react";
import models, { companies } from "../../../../assets/models";
import { calcModelCost, COMPLEXITY_MULTIPLIERS } from "../../constant";

export const useCostEstimator = () => {
  const [company, setCompany] = useState("");
  const [model, setModel] = useState("");
  const [words, setWords] = useState("");
  const [complexity, setComplexity] = useState("Simple");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleCompanyChange = useCallback((newCompany) => {
    setCompany(newCompany);
    setModel(Object.keys(models[newCompany])[0]);
    setResults(null);
    setError("");
  }, []);

  const handleModelChange = useCallback((newModel) => {
    setModel(newModel);
    setResults(null);
  }, []);

  const handleWordsChange = useCallback((val) => {
    setWords(String(val));
  }, []);

  const handleCalculate = useCallback(() => {
    if (!words || Number(words) <= 0) {
      setError("Please enter a valid prompt word count greater than 0.");
      setResults(null);
      return;
    }
    setError("");
    const calc = calcModelCost(company, model, words, complexity);
    if (!calc) {
      setError("Please enter a valid prompt word count greater than 0.");
      setResults(null);
      return;
    }
    setResults(calc);
  }, [words, company, model, complexity]);

  const handleReset = useCallback(() => {
    setCompany("");
    setModel("");
    setWords("");
    setComplexity("Simple");
    setResults(null);
    setError("");
  }, []);

  const modelNames =
    company && models[company] ? Object.keys(models[company]) : [];
  const canCalculate = company && model && words && Number(words) > 0;

  const handleClearError = useCallback(() => setError(""), []);

  return useMemo(() => ({
    useCostEst: {
      company,
      model,
      words,
      complexity,
      setComplexity,
      results,
      setResults,
      error,
      setError,
      handleCompanyChange,
      handleModelChange,
      handleWordsChange,
      handleCalculate,
      handleReset,
      handleClearError,
      modelNames,
      canCalculate,
      companies,
      COMPLEXITY_MULTIPLIERS,
      setWords,
    },
  }), [company, model, words, complexity, results, error, handleCompanyChange, handleModelChange, handleWordsChange, handleCalculate, handleReset, modelNames, canCalculate]);
};
