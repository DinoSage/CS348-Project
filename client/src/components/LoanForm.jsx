import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    borrowerName: "",
    dueDate: "",
  });
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { bookTitle, borrowerName, dueDate } = formData;

    // Validate form fields
    if (!bookTitle || !borrowerName || !dueDate) {
      setError("All fields are required.");
      return;
    }

    const newLoan = {
        bookTitle: formData.bookTitle,
        borrowerName: formData.borrowerName,
        dueDate: formData.dueDate,
        };

    try {
      const response = await fetch("http://localhost:5000/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLoan),
      });

      if (!response.ok) {
        setError("Error adding the loan.");
        return;
      }

      navigate("/"); // Redirect to the loan list page after success
    } catch (error) {
      setError("Error adding the loan.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Loan</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Book Title:</label>
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Borrower:</label>
          <input
            type="text"
            name="borrowerName"
            value={formData.borrowerName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Return Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Loan
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
