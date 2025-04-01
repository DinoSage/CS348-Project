import React, { useState } from "react";

function Report() {
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/report?start=${filters.startDate}&end=${filters.endDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Loan Reports</h2>

      <div className="flex space-x-4">
        <input 
          type="date" 
          value={filters.startDate} 
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} 
          className="border p-2 rounded"
        />
        <input 
          type="date" 
          value={filters.endDate} 
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} 
          className="border p-2 rounded"
        />
        <button onClick={fetchReport} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Loading..." : "Generate Report"}
        </button>
      </div>

      {reportData && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Report Summary</h3>
          <p><strong>Total Loans:</strong> {reportData.totalLoans}</p>
          <p><strong>Average Loan Duration:</strong> {reportData.avgDuration} days</p>
          <p><strong>Late Returns:</strong> {reportData.lateReturns}</p>
          <p><strong>Most Borrowed Book:</strong> {reportData.mostBorrowedBook}</p>
        </div>
      )}
    </div>
  );
}

export default Report;