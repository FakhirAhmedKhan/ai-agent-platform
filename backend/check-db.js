const mongoose = require('mongoose');

async function checkDb() {
  await mongoose.connect('mongodb://localhost:27017/ai-multi-agent');
  const db = mongoose.connection.db;
  const settings = await db.collection('settings').findOne();
  console.log("Settings in DB:", JSON.stringify(settings, null, 2));
  
  if (settings && settings.api && settings.api.geminiKey) {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    console.log("Key present, testing with SDK...");
    try {
      const genAI = new GoogleGenerativeAI(settings.api.geminiKey);
      
      console.log("Testing with gemini-1.5-flash...");
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1beta" });
        await model.generateContent("Test");
        console.log("gemini-1.5-flash OK");
      } catch (err) {
        console.error("gemini-1.5-flash failed:", err.message);
      }
      
      console.log("Listing models...");
      // Let's do a REST call to list models using fetch to see what's actually available.
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${settings.api.geminiKey}`);
      const data = await response.json();
      console.log("Available models:", data.models?.map(m => m.name).join(", "));
      
    } catch(err) {
      console.log(err);
    }
  }
  
  await mongoose.disconnect();
}

checkDb();
