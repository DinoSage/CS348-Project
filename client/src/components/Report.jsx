import React, { useState } from "react";
import LoanTable from "./LoanTable";

const Report = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/loans/report?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      if (response.ok) {
        setReportData(data);
      } else {
        throw new Error("Failed to fetch report");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchOverdueLoans = async () => {
    try {
      const response = await fetch("http://localhost:5000/loans");
      const data = await response.json();
      if (response.ok) {
        const now = new Date();
        const overdue = data.filter(
          (loan) => new Date(loan.dueDate) < now
        );
        setReportData(overdue);
      } else {
        throw new Error("Failed to fetch loans");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/loans/${id}`, { method: "DELETE" });
    setReportData(reportData.filter((loan) => loan._id !== id));
  };

  const handleExtend = async (id, newDate) => {
    await fetch(`http://localhost:5000/loans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dueDate: `${newDate}T12:00:00` }),
    });
    fetchReport(); // Or refetch overdue if that was last clicked
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generate Report</h2>

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
        onClick={fetchReport}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Generate Report
      </button>
      <button
        onClick={fetchOverdueLoans}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Show Outstanding Loans
      </button>

      {error && <div className="text-red-600 mt-4">{error}</div>}

      {reportData.length > 0 && (
        <div className="mt-6">
          <LoanTable
            loans={reportData}
            onDelete={handleDelete}
            onExtend={handleExtend}
          />
        </div>
      )}
    </div>
  );
};

export default Report;
