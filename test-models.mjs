import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "node:fs";

const key = process.env.GEMINI_API_KEY || (() => {
  const match = readFileSync(".env.local", "utf8").match(/GEMINI_API_KEY\s*=\s*(.+)/);
  return match ? match[1].trim() : "";
})();

async function check() {
  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent("hello");
    console.log(result.response.text());
  } catch (e) {
    console.error(e);
  }
}
check();