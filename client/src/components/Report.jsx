import React, { useState } from "react";

const Report = () => {
  const [bookFilter, setBookFilter] = useState("");
  const [borrowerFilter, setBorrowerFilter] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);

  const generateReport = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/loans?book=${bookFilter}&borrower=${borrowerFilter}`
      );
      const data = await response.json();
      setFilteredLoans(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Generate Loan Report</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Book Title:</label>
        <input
          type="text"
          value={bookFilter}
          onChange={(e) => setBookFilter(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Borrower:</label>
        <input
          type="text"
          value={borrowerFilter}
          onChange={(e) => setBorrowerFilter(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <button
        onClick={generateReport}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Generate Report
      </button>

      {filteredLoans.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Report Results</h3>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border p-2">Book Title</th>
                <th className="border p-2">Borrower</th>
                <th className="border p-2">Return Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td className="border p-2">{loan.book}</td>
                  <td className="border p-2">{loan.borrower}</td>
                  <td className="border p-2">{loan.returnDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Report;
