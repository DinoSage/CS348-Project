import React, { useState, useEffect } from "react";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the last 3 loans
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("http://localhost:5000/loans");
        const data = await response.json();
        if (response.ok) {
          setLoans(data.slice(-3)); // Display only the last 3 loans
        } else {
          throw new Error("Failed to fetch loans");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Handle delete loan
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/loans/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLoans(loans.filter((loan) => loan._id !== id));
      } else {
        throw new Error("Failed to delete loan");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle edit loan (for now, we'll just log the id, but you can expand this to show an edit form)
  const handleEdit = (id) => {
    console.log("Edit loan with id:", id);
    // You can implement your edit functionality here (maybe open a modal or navigate to an edit page)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loans.length === 0) {
    return <div>No loans found</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Last 3 Loans</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Book Title</th>
            <th className="border-b p-2">Borrower</th>
            <th className="border-b p-2">Due Date</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td className="border-b p-2">{loan.bookTitle}</td>
              <td className="border-b p-2">{loan.borrowerName}</td>
              <td className="border-b p-2">
                {new Date(loan.dueDate).toLocaleDateString()}
              </td>
              <td className="border-b p-2">
                <button
                  onClick={() => handleEdit(loan._id)}
                  className="mr-2 text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(loan._id)}
                  className="text-red-500"
                >
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
