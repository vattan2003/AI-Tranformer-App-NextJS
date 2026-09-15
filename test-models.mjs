import { GoogleGenerativeAI } from "@google/generative-ai";

async function check() {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyAxzymDrxBxb2alr4SgJ5RgvWVQGZsJHmE");
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent("hello");
    console.log(result.response.text());
  } catch (e) {
    console.error(e);
  }
}
check();
