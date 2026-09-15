import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("BODY:", body);

    const { input, mode, tone, target } = body;

    if (!input) {
      return Response.json({ error: "Input required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-3.6-flash as the free, fast model
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    let instructions = "";
    if (mode === "summarize") {
      instructions = "Summarize the following text into 5 bullet points.";
    } else if (mode === "rewrite") {
      instructions = `Rewrite the following text in a ${tone} tone.`;
    } else if (mode === "translate") {
      instructions = `Translate the following text to ${target}.`;
    }

    const prompt = `${instructions}\n\nText to process:\n${input}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(text);

    return Response.json({
      output: text,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}