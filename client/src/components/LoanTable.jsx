import React, { useState } from "react";

const LoanTable = ({ loans, onDelete, onExtend }) => {
  const [editId, setEditId] = useState(null);
  const [newDate, setNewDate] = useState("");

  const handleExtendClick = (loanId, currentDueDate) => {
    setEditId(loanId);
    setNewDate(currentDueDate.slice(0, 10)); // "YYYY-MM-DD"
  };

  const handleExtendSubmit = (loanId) => {
    if (newDate) {
      onExtend(loanId, newDate);
    }
    setEditId(null);
    setNewDate("");
  };

  return (
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
            <td className="border-b p-2 space-x-2">
              <button
                className="text-red-600"
                onClick={() => onDelete(loan._id)}
              >
                Delete
              </button>
              {editId === loan._id ? (
                <>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="border px-1 py-0.5 rounded"
                  />
                  <button
                    className="text-green-600"
                    onClick={() => handleExtendSubmit(loan._id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="text-blue-600"
                  onClick={() => handleExtendClick(loan._id, loan.dueDate)}
                >
                  Extend
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoanTable;
