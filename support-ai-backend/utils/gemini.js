import { GoogleGenerativeAI } from "@google/generative-ai";


export async function getAIResponse(userMessage) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Add a system prompt for ecommerce support assistant
    const prompt = `You are an ecommerce support assistant. Be polite, helpful, and answer in short, maximum 2 sentence .\n\nUser: ${userMessage}`;
    // console.log(prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    // console.log("AI Response:", response);

    return response;
  } catch (error) {
    console.error("AI Error:", error);
    return "Sorry, I'm having trouble answering right now 🙏";
  }
}

