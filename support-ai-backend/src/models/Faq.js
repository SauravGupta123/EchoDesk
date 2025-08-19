import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Faq = mongoose.model("Faq", faqSchema);
export default Faq; 

const seedFaqs = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/support_ai");
  await Faq.deleteMany({});

  await Faq.insertMany([
    { question: "How can I return a product?", answer: "You can return products within 30 days by emailing returns@company.com" },
    { question: "What is your support email?", answer: "You can contact support@company.com for assistance." },
    { question: "Do you provide warranty?", answer: "Yes, all products come with a 1-year warranty." },
  ]);

  console.log("✅ FAQ seeded!");
  process.exit();
};

// seedFaqs();
