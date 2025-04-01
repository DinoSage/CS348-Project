import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("http://localhost:5000/loans");
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Loan Management</h2>
      <div className="mb-4">
        <Link
          to="/add-loan"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Loan
        </Link>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Book Title</th>
            <th className="border p-2">Borrower</th>
            <th className="border p-2">Return Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td className="border p-2">{loan.book}</td>
              <td className="border p-2">{loan.borrower}</td>
              <td className="border p-2">{loan.returnDate}</td>
              <td className="border p-2">
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanList;
