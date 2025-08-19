// import dotenv from 'dotenv';
// dotenv.config();
import { Pinecone } from "@pinecone-database/pinecone";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("orders-index");

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  item: String,
  status: String,
  date: Date,
});

const Order = mongoose.model("Order", orderSchema);

async function seedEmbeddings() {
  await mongoose.connect("mongodb://localhost:27017/ordersdb");
  const orders = await Order.find();

  for (const order of orders) {
    const textDoc = `Order ID: ${order.orderId}, Customer: ${order.customerName}, Item: ${order.item}, Status: ${order.status}, Date: ${order.date.toDateString()}`;

    const embeddingResponse = await embedModel.embedContent(textDoc);
    console.log(embeddingResponse)
  const embedding = embeddingResponse.embedding.values || embeddingResponse.data || embeddingResponse.embedding;

    await index.upsert([
      {
        id: order.orderId,
        values: embedding, // Make sure this is a flat array of numbers
        metadata: { text: textDoc },
      },
    ]);
  }

  console.log("✅ Orders embedded and stored in Pinecone!");
  process.exit();
}

seedEmbeddings();
