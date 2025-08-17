import dotenv from 'dotenv';
dotenv.config();
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const faqIndex = pc.index("faq-index");

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Faq = mongoose.model("Faq", faqSchema);

async function seedFaqEmbeddings() {
  await mongoose.connect("mongodb://127.0.0.1:27017/support_ai");
  const faqs = await Faq.find();

  for (const faq of faqs) {
    const textDoc = `Q: ${faq.question} A: ${faq.answer}`;
 const embeddingResponse = await embedModel.embedContent(textDoc);
    console.log(embeddingResponse)
  const embedding = embeddingResponse.embedding.values || embeddingResponse.data || embeddingResponse.embedding;

    await faqIndex.upsert([
      {
        id: faq._id.toString(),
        values: embedding,
        metadata: { text: textDoc },
      },
    ]);
  }

  console.log("✅ FAQ embeddings stored in Pinecone!");
  process.exit();
}

seedFaqEmbeddings();
