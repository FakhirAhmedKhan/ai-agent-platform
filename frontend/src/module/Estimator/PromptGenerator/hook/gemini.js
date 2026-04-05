const GEMINI_KEYS = [
  import.meta.env.VITE_GEMINI_KEY_1,
  import.meta.env.VITE_GEMINI_KEY_2,
  import.meta.env.VITE_GEMINI_KEY_3,
].filter(Boolean);

const VITE_API_URL = import.meta.env.VITE_API_URL || "";
const MODEL_NAME = "gemini-2.0-flash";

// simple client-side rate limit
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW_MS = 60 * 1000; // per 1 minute
const requestTimestamps = [];

// optional cooldown per key when exhausted
const keyCooldowns = new Map(); // key -> timestamp
let currentKeyIndex = 0;

function checkRateLimit() {
  const now = Date.now();

  while (requestTimestamps.length && now - requestTimestamps[0] > RATE_WINDOW_MS) {
    requestTimestamps.shift();
  }

  if (requestTimestamps.length >= RATE_LIMIT) {
    throw new Error(`Rate limit exceeded. Only ${RATE_LIMIT} requests allowed per minute.`);
  }

  requestTimestamps.push(now);
}

function isKeyAvailable(key) {
  const cooldownUntil = keyCooldowns.get(key) || 0;
  return Date.now() >= cooldownUntil;
}

function markKeyCooldown(key, ms = 60 * 1000) {
  keyCooldowns.set(key, Date.now() + ms);
}

async function callGeminiWithKey(apiKey, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.error?.message ||
      `Gemini API error ${res.status}`;

    const lowerMsg = message.toLowerCase();

    const isQuotaError =
      res.status === 429 ||
      lowerMsg.includes("quota") ||
      lowerMsg.includes("rate limit") ||
      lowerMsg.includes("resource exhausted");

    const error = new Error(message);
    error.isQuotaError = isQuotaError;
    error.status = res.status;
    throw error;
  }

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    ""
  );
}

export async function generatePrompt(description) {
  if (!description?.trim()) {
    throw new Error("Description is required.");
  }

  if (!GEMINI_KEYS.length) {
    throw new Error("No Gemini API keys found in .env");
  }

  checkRateLimit();
  
  // 1. If we have a custom backend, use it
  if (VITE_API_URL) {
    try {
      const res = await fetch(VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Custom API error.");
      return data.prompt || data.polished_prompt || data;
    } catch (err) {
      console.warn("Custom API failed, falling back to Gemini SDK", err);
    }
  }

  const polishedPrompt = `
You are an expert prompt engineer.
Convert the following raw idea into a polished, clear, professional prompt.

Idea: ${description}

Return only the polished prompt.
  `.trim();

  let lastError = null;

  for (let i = 0; i < GEMINI_KEYS.length; i++) {
    const index = (currentKeyIndex + i) % GEMINI_KEYS.length;
    const key = GEMINI_KEYS[index];

    if (!isKeyAvailable(key)) {
      continue;
    }

    try {
      const result = await callGeminiWithKey(key, polishedPrompt);
      currentKeyIndex = index;
      return result;
    } catch (error) {
      lastError = error;

      if (error.isQuotaError) {
        markKeyCooldown(key, 60 * 1000); // 1 minute cooldown
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    lastError?.message || "All Gemini keys are exhausted or unavailable."
  );
}