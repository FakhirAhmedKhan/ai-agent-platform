const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config({ path: ".ENV" });

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
  if (!apiKey || apiKey === 'fake-dev-key') {
    console.log("No valid API key found in .env. Skipping real call.");
    return;
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1beta" });
    const result = await model.generateContent("Hello?");
    console.log("Success with gemini-1.5-flash! Result:", result.response.text());
  } catch (err) {
    console.error("Error with gemini-1.5-flash:", err.message);
  }
}

listModels();
