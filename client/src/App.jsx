import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoanList from "./components/LoanList";
import LoanForm from "./components/LoanForm";
import Report from "./components/Report";

function App() {
  return (
    <Router>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Navigation Bar */}
        <nav className="mb-6 bg-white p-4 shadow rounded flex space-x-6">
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Manage Loans
          </Link>
          <Link to="/report" className="text-blue-600 font-semibold hover:underline">
            Generate Report
          </Link>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<LoanList />} />
            <Route path="/report" element={<Report />} />
            <Route path="/add-loan" element={<LoanForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
