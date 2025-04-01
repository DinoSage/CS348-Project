import React, { useState } from "react";

function LoanForm({ setLoans }) {
  const [formData, setFormData] = useState({
    bookTitle: "",
    borrowerName: "",
    dueDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Book is already loaned") {
          setErrorMessage("This book is already loaned out. Please choose another book.");
        } else {
          setErrorMessage("Failed to add loan. Please try again.");
        }
        return;
      }

      setLoans((prev) => [...prev, data]); // Add new loan to state
      setFormData({ bookTitle: "", borrowerName: "", dueDate: "" }); // Reset form
    } catch (error) {
      console.error("Error adding loan:", error);
      setErrorMessage("An error occurred. Please check your connection and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-50">
      <div className="mb-2">
        <label className="block font-semibold">Book Title:</label>
        <input
          type="text"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-semibold">Borrower Name:</label>
        <input
          type="text"
          name="borrowerName"
          value={formData.borrowerName}
          onChange={(e) => setFormData({ ...formData, borrowerName: e.target.value })}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-semibold">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Add Loan
      </button>
    </form>
  );
}

export default LoanForm;
