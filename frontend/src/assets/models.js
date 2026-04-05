const models = {
  OpenAI: {
    "GPT-4o Mini": {
      inputCostPer1M: 0.15,
      outputCostPer1M: 0.6,
      contextWindow: 128000,
      category: "budget",
    },
    "GPT-4o": {
      inputCostPer1M: 5.0,
      outputCostPer1M: 15.0,
      contextWindow: 128000,
      category: "premium",
    },
    "GPT-3.5 Turbo": {
      inputCostPer1M: 0.5,
      outputCostPer1M: 1.5,
      contextWindow: 16000,
      category: "budget",
    },
  },

  Anthropic: {
    "Claude Haiku": {
      inputCostPer1M: 0.25,
      outputCostPer1M: 1.25,
      contextWindow: 200000,
      category: "budget",
    },
    "Claude Sonnet": {
      inputCostPer1M: 3.0,
      outputCostPer1M: 15.0,
      contextWindow: 200000,
      category: "balanced",
    },
    "Claude Opus": {
      inputCostPer1M: 15.0,
      outputCostPer1M: 75.0,
      contextWindow: 200000,
      category: "premium",
    },
  },

  "Google DeepMind": {
    "Gemini 1.5 Flash": {
      inputCostPer1M: 0.35,
      outputCostPer1M: 1.05,
      contextWindow: 1000000,
      category: "budget",
    },
    "Gemini 1.5 Pro": {
      inputCostPer1M: 3.5,
      outputCostPer1M: 10.5,
      contextWindow: 1000000,
      category: "premium",
    },
  },

  Meta: {
    "Llama 3 8B (Hosted)": {
      inputCostPer1M: 0.2,
      outputCostPer1M: 0.8,
      contextWindow: 8000,
      category: "budget",
    },
    "Llama 3 70B (Hosted)": {
      inputCostPer1M: 0.8,
      outputCostPer1M: 2.4,
      contextWindow: 8000,
      category: "balanced",
    },
  },

  Mistral: {
    "Mistral Small": {
      inputCostPer1M: 0.2,
      outputCostPer1M: 0.6,
      contextWindow: 32000,
      category: "budget",
    },
    "Mistral Medium": {
      inputCostPer1M: 2.5,
      outputCostPer1M: 7.5,
      contextWindow: 32000,
      category: "balanced",
    },
    "Mistral Large": {
      inputCostPer1M: 8.0,
      outputCostPer1M: 24.0,
      contextWindow: 32000,
      category: "premium",
    },
  },
};

export default models;

export const companies = Object.keys(models);

export const countWords = (text) =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY ?? "";

export const SYSTEM_MSG =
  "You are an expert AI prompt engineer. When the user describes what they want to build or do, generate a single clear, concise, and effective AI prompt they can use. Return ONLY the prompt text — no explanations, no labels, no markdown.";
export const ChipMainStyle =
  "bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/60 dark:shadow-gray-950/60 border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-5";
export const MainSection =
  "min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-950 dark:via-indigo-950/20 dark:to-purple-950/10 flex flex-col";
