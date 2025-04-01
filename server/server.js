import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loanRoutes from "./routes/loans.js";

const app = express();
const PORT = process.env.PORT || 5050;
const uri = process.env.ATLAS_URI || "";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Middleware
app.use(cors());
app.use(express.json());

try {
  // Create a Mongoose client
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
}

app.use("/loans", loanRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
