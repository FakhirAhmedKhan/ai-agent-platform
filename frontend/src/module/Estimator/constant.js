import models from "../../assets/models";

export const calcModelCost = (company, modelName, words, complexity) => {

  const pricing = models[company]?.[modelName];
 
  if (!pricing || !words || Number(words) <= 0) return null;
 
  const inputTokens = Math.round(Number(words) * 1.3);
 
  const outputTokens = Math.round(
    inputTokens * COMPLEXITY_MULTIPLIERS[complexity],
  );
 
  const totalTokens = inputTokens + outputTokens;
 
  const inputCost = (inputTokens / 1_000_000) * pricing.inputCostPer1M;
 
  const outputCost = (outputTokens / 1_000_000) * pricing.outputCostPer1M;
 
  const finalCost = inputCost + outputCost;
 
  return { inputTokens, outputTokens, totalTokens, finalCost, pricing };
};

export const COMPLEXITY_MULTIPLIERS = { Simple: 0.5, Moderate: 1.0, Complex: 2.0 };
