import React, { useState, useEffect } from "react";
import LoanTable from "./LoanTable";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    borrowerName: "",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const [recentLoans, setRecentLoans] = useState([]);

  const fetchRecentLoans = async () => {
    try {
      const response = await fetch("http://localhost:5000/loans");
      const data = await response.json();
      if (response.ok) {
        setRecentLoans(data.slice(-5).reverse());
      }
    } catch (err) {
      console.error("Error fetching recent loans:", err);
    }
  };

  useEffect(() => {
    fetchRecentLoans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { bookTitle, borrowerName, dueDate } = formData;

    if (!bookTitle || !borrowerName || !dueDate) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) {
        setError("Error adding the loan.");
        return;
      }

      setFormData({ bookTitle: "", borrowerName: "", dueDate: "" });
      setError("");
      fetchRecentLoans();
    } catch (error) {
      setError("Error adding the loan.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/loans/${id}`, { method: "DELETE" });
    fetchRecentLoans();
  };

  const handleExtend = async (id, newDate) => {
    await fetch(`http://localhost:5000/loans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dueDate: `${newDate}T12:00:00` }),
    });
    fetchRecentLoans();
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
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Borrower:</label>
          <input
            type="text"
            name="borrowerName"
            value={formData.borrowerName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Return Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Loan
        </button>
      </form>

      {recentLoans.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Last 5 Added Loans</h3>
          <LoanTable
            loans={recentLoans}
            onDelete={handleDelete}
            onExtend={handleExtend}
          />
        </div>
      )}
    </div>
  );
};

export default LoanForm;
