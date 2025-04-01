import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoanForm from "./components/LoanForm";
import Report from "./components/Report";
import ViewLoans from "./components/ViewLoans";

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100">
        <nav className="mb-6 bg-white p-4 shadow rounded flex space-x-6">
          <Link to="/add-loan" className="text-blue-600 font-semibold hover:underline">Add Loan</Link>
          <Link to="/report" className="text-blue-600 font-semibold hover:underline">Generate Report</Link>
          <Link to="/view-loans" className="text-blue-600 font-semibold hover:underline">View Loans</Link>
        </nav>

        <Routes>
          <Route path="/add-loan" element={<LoanForm />} />
          <Route path="/report" element={<Report />} />
          <Route path="/view-loans" element={<ViewLoans />} />
          <Route path="*" element={<LoanForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
