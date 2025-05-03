import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true, unique: true },
  borrowerName: { type: String, required: true },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

LoanSchema.index({ dueDate: 1}); // schema level
const Loan = mongoose.model("Loan", LoanSchema);

export default Loan;