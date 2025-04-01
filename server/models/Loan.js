import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true, unique: true },
  borrowerName: { type: String, required: true },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

const Loan = mongoose.model("Loan", LoanSchema);

export default Loan;