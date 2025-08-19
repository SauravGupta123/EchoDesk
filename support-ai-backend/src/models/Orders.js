import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  item: String,
  status: String,
  date: Date,
  phoneNo: String,
});

const Order = mongoose.model("Order", orderSchema);

const seed = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/support_ai");

  await Order.deleteMany({}); // clear old data

  await Order.insertMany([
    {
      orderId: "ORD001",
      customerName: "Alice",
      item: "Laptop",
      status: "Shipped",
      date: new Date("2025-08-01"),
      phoneNo:"9779824541491"
    },
    {
      orderId: "ORD002",
      customerName: "Bob",
      item: "Phone",
      status: "Processing",
      date: new Date("2025-08-10"),
      phoneNo:"9779824541491"
    },
    {
      orderId: "ORD003",
      customerName: "Charlie",
      item: "Headphones",
      status: "Delivered",
      date: new Date("2025-08-05"),
      phoneNo:"9779824541491"
    },
  ]);

  console.log("✅ Demo orders seeded!");
  process.exit();
};

seed();
