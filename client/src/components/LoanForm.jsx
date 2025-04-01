import React, { useState, useEffect } from "react";

function LoanForm({ setLoans }) {
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [formData, setFormData] = useState({
    bookId: "",
    borrowerId: "",
    dueDate: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/books").then(res => res.json()).then(data => setBooks(data));
    fetch("http://localhost:5000/borrowers").then(res => res.json()).then(data => setBorrowers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(newLoan => setLoans(prev => [...prev, newLoan]));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-50">
      <select name="bookId" onChange={(e) => setFormData({ ...formData, bookId: e.target.value })} required>
        <option value="">Select Book</option>
        {books.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}
      </select>
      <select name="borrowerId" onChange={(e) => setFormData({ ...formData, borrowerId: e.target.value })} required>
        <option value="">Select Borrower</option>
        {borrowers.map(borrower => <option key={borrower.id} value={borrower.id}>{borrower.name}</option>)}
      </select>
      <input type="date" name="dueDate" onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
      <button type="submit" className="bg-blue-500 text-white p-2">Add Loan</button>
    </form>
  );
}

export default LoanForm;