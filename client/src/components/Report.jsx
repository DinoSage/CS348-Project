import React, { useState } from "react";

const Report = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch loans within the date range
  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/loans/report?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      if (response.ok) {
        setReportData(data);
      } else {
        throw new Error("Failed to fetch report data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generate Loan Report</h2>
      <div className="mb-4">
        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleGenerateReport}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Report
      </button>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {reportData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Loan Report</h3>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Book Title</th>
                <th className="border-b p-2">Borrower</th>
                <th className="border-b p-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((loan) => (
                <tr key={loan._id}>
                  <td className="border-b p-2">{loan.bookTitle}</td>
                  <td className="border-b p-2">{loan.borrowerName}</td>
                  <td className="border-b p-2">
                    {new Date(loan.dueDate).toLocaleDateString()}
                  </td>
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
