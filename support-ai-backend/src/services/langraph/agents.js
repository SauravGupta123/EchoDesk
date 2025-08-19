import dotenv from 'dotenv';
dotenv.config();
import { StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { z } from "zod";

console.log('PINECONE_API_KEY:', process.env.PINECONE_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

// Pinecone setup
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const orderIndex = pinecone.index("orders-index");
const faqIndex = pinecone.index("faq-index");

// Input schema for validation - Updated to include the routing decision
const inputSchema = z.object({
  userMessage: z.string(),
  customerNumber: z.string().optional(),
  next: z.string().optional(),
  replyMsg: z.string().optional()
});

const graph = new StateGraph(inputSchema);

// Router node - determines which agent to use
graph.addNode("Router", async (state) => {
  console.log("Router state:", state);

  const orderKeywords = ["order", "ORD", "status", "shipment", "invoice", "delivery", "tracking"];
  const isOrderRelated = orderKeywords.some(word =>
    state.userMessage.toLowerCase().includes(word.toLowerCase())
  );

  console.log("Is order related:", isOrderRelated);

  if (isOrderRelated) {
    return { ...state, next: "OrderTool" };
  }
  return { ...state, next: "FaqTool" };
});

// Order Agent Node
graph.addNode("OrderTool", async (state) => {
  console.log("OrderTool processing:", state.userMessage);

  try {
    const { userMessage, customerNumber } = state;
    const embedding = await embedModel.embedContent(userMessage);

    const orderResults = await orderIndex.query({
      vector: embedding.embedding.values,
      topK: 3,
      includeMetadata: true,
      filter: { customerNumber }
    });

    const context = orderResults.matches.map(m => m.metadata?.text || '').join("\n");
    const prompt = `You are a customer support assistant specializing in orders. Just give answers with greetings to the user . Use the context below to answer the user's question about their order.

Context:
${context}

User: ${userMessage}
Customer Number: ${customerNumber}

Answer:`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    return {
      ...state,
      replyMsg: result.response.text(),
      next: "__end__"
    };
  } catch (error) {
    console.error("Error in OrderTool:", error);
    return {
      ...state,
      replyMsg: "I apologize, but I'm having trouble accessing your order information right now. Please try again later or contact customer service directly.",
      next: "__end__"
    };
  }
});

// FAQ Agent Node  
graph.addNode("FaqTool", async (state) => {
  console.log("FaqTool processing:", state.userMessage);

  try {
    const { userMessage } = state;
    const embedding = await embedModel.embedContent(userMessage);

    const faqResults = await faqIndex.query({
      vector: embedding.embedding.values,
      topK: 3,
      includeMetadata: true,
    });

    const context = faqResults.matches.map(m => m.metadata?.text || '').join("\n");
    const prompt = `You are a helpful support assistant. Use the context below to answer the user's general question.

Context:
${context}

User: ${userMessage}

Answer:`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    return {
      ...state,
      replyMsg: result.response.text(),
      next: "__end__"
    };
  } catch (error) {
    console.error("Error in FaqTool:", error);
    return {
      ...state,
      replyMsg: "I apologize, but I'm having trouble finding the information you need right now. Please try rephrasing your question or contact customer service directly.",
      next: "__end__"
    };
  }
});

// Define the routing logic using conditional edges
function routeDecision(state) {
  console.log("Routing decision for:", state.next);
  return state.next;
}

// Set up the graph structure
graph.addEdge("__start__", "Router");

// Add conditional edges from Router to the appropriate tool
graph.addConditionalEdges(
  "Router",
  routeDecision,
  {
    "OrderTool": "OrderTool",
    "FaqTool": "FaqTool"
  }
);

// Both tools end the conversation
graph.addEdge("OrderTool", "__end__");
graph.addEdge("FaqTool", "__end__");

// Compile the graph
export const agentRouter = graph.compile();

// ✅ Test function
async function testAgent() {
  try {
    // console.log("🔹 Testing with FAQ question:");
   
    const orderInput = {
      userMessage: "What's the status of my order ORD002?",
      customerNumber: "9779824541491"
    };
    // console.log("Input:", orderInput);
    const orderResponse = await agentRouter.invoke(orderInput);
    console.log("✅ Order Response:", orderResponse);
    console.log("Response message:", orderResponse.replyMsg);

  } catch (err) {
    console.error("❌ Error running test:", err);
  }
}

testAgent();