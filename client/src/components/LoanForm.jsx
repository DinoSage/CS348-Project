import React, { useState } from "react";

function LoanForm({ setLoans }) {
  const [formData, setFormData] = useState({
    bookTitle: "",
    borrowerName: "",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5050/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newLoan) => setLoans((prev) => [...prev, newLoan]));

    setFormData({ bookTitle: "", borrowerName: "", dueDate: "" }); // Reset form after submission
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

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Add Loan
      </button>
    </form>
  );
}

export default LoanForm;
