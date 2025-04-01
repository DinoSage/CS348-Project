import React, { useEffect, useState } from "react";
import LoanForm from "./LoanForm";

function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/loans") // Fetch loans from backend
      .then((res) => res.json())
      .then((data) => setLoans(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/loans/${id}`, { method: "DELETE" })
      .then(() => setLoans(loans.filter(loan => loan.id !== id)));
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Manage Book Loans</h2>
      <LoanForm setLoans={setLoans} />
      <ul className="mt-4">
        {loans.map((loan) => (
          <li key={loan.id} className="p-2 border-b flex justify-between">
            {loan.bookTitle} - {loan.borrowerName} (Due: {loan.dueDate})
            <button onClick={() => handleDelete(loan.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanList;