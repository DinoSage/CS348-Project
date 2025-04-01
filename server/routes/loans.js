import express from "express";
import Loan from "../models/Loan.js";
import mongoose from "mongoose"; // Import mongoose for connection checks

const router = express.Router();

// Get all loans
router.get("/", async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (err) {
    console.error("Error fetching loans:", err);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

router.get("/report", async (req, res) => {
  const { startDate, endDate } = req.query;

  // Convert to proper date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  try {
    const loans = await Loan.find({
      dueDate: { $gte: start, $lte: end },
    });

    res.json(loans);
  } catch (err) {
    console.error("Error fetching report data:", err);
    res.status(500).json({ message: "Error fetching report data" });
  }
});

// Get a single loan by ID
router.get("/:id", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    res.status(200).json(loan);
  } catch (err) {
    console.error("Error fetching loan:", err);
    res.status(500).json({ error: "Failed to fetch loan" });
  }
});

// Create a new loan (Checks if book is already loaned)
router.post("/", async (req, res) => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB is not connected.");
    }

    const { bookTitle, borrowerName, dueDate } = req.body;

    // Create a new loan instance
    const newLoan = new Loan({
      bookTitle,
      borrowerName,
      dueDate,
    });

    // Save the new loan to the database
    await newLoan.save();
    res.status(201).json(newLoan); // Respond with the newly created loan
  } catch (err) {
    console.error("Error creating loan:", err);
    res.status(400).json({ message: "Error creating loan", error: err.message });
  }
});

// Update a loan by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLoan) return res.status(404).json({ error: "Loan not found" });
    
    res.status(200).json({ message: "Loan updated successfully", updatedLoan });
  } catch (err) {
    console.error("Error updating loan:", err);
    res.status(500).json({ error: "Failed to update loan" });
  }
});

// Delete a loan by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
    if (!deletedLoan) return res.status(404).json({ error: "Loan not found" });

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (err) {
    console.error("Error deleting loan:", err);
    res.status(500).json({ error: "Failed to delete loan" });
  }
});

export default router;