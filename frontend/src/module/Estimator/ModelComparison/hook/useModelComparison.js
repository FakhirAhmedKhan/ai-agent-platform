import { useState, useMemo, useCallback } from "react";
import models from "../../../../assets/models";
import { calcModelCost, COMPLEXITY_MULTIPLIERS } from "../../constant";

export const useModelComparison = () => {
  const [words, setWords] = useState("");
  const [complexity, setComplexity] = useState("Moderate");
  const [selected, setSelected] = useState([]);

  const allModels = useMemo(
    () =>
      Object.entries(models).flatMap(([company, ms]) =>
        Object.entries(ms).map(([name, pricing]) => ({
          company,
          name,
          pricing,
        }))
      ),
    []
  );

  const toggle = useCallback((key) =>
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    ), []);

  const results = useMemo(() => {
    if (!words || Number(words) <= 0) return [];
    return selected
      .map((key) => {
        const [company, name] = key.split("||");
        const r = calcModelCost(company, name, words, complexity);
        return r ? { company, name, ...r } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.finalCost - b.finalCost);
  }, [selected, words, complexity]);

  const cheapestKey = results[0]
    ? `${results[0].company}||${results[0].name}`
    : null;

  const hasResults = results.length > 0;

  return useMemo(() => ({
    useModelComp: {
      words,
      setWords,
      complexity,
      setComplexity,
      selected,
      toggle,
      allModels,
      results,
      cheapestKey,
      hasResults,
      COMPLEXITY_MULTIPLIERS,
    },
  }), [words, complexity, selected, toggle, allModels, results, cheapestKey, hasResults]);
};
