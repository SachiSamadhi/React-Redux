import React from "react";
import "./AdminPages.css";

const ManageLoans = () => {
  const loans = [
    { id: 1, type: "Personal Loan", user: "John Doe", amount: "$5000", status: "Approved" },
    { id: 2, type: "Car Loan", user: "Jane Smith", amount: "$7000", status: "Pending" },
  ];

  return (
    <div className="page-container admin-page">
      <h1>Manage Loans</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.user}</td>
              <td>{loan.type}</td>
              <td>{loan.amount}</td>
              <td className={`status ${loan.status.toLowerCase()}`}>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLoans;
