import React, { useState } from "react";
import LoanTable from "./LoanTable";

const ViewLoans = () => {
  const [borrower, setBorrower] = useState("");
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!borrower) {
      setError("Please enter a borrower name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/loans");
      const data = await response.json();
      if (response.ok) {
        const filtered = data.filter((loan) =>
          loan.borrowerName.toLowerCase().includes(borrower.toLowerCase())
        );
        setLoans(filtered);
        setError("");
      } else {
        throw new Error("Failed to fetch loans");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/loans/${id}`, { method: "DELETE" });
    setLoans(loans.filter((loan) => loan._id !== id));
  };

  const handleExtend = async (id, newDate) => {
    await fetch(`http://localhost:5000/loans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dueDate: `${newDate}T12:00:00` }),
    });
    handleSearch();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">View Loans by Borrower</h2>
      <div className="mb-4">
        <label className="block mb-2">Borrower Name:</label>
        <input
          type="text"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {error && <div className="text-red-600 mt-4">{error}</div>}

      {loans.length > 0 && (
        <div className="mt-6">
          <LoanTable
            loans={loans}
            onDelete={handleDelete}
            onExtend={handleExtend}
          />
        </div>
      )}
    </div>
  );
};

export default ViewLoans;
