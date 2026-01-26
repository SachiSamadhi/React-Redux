import React from "react";
import "./AdminPages.css";

const Approvals = () => {
  const requests = [
    { id: 1, user: "Jane Smith", loanType: "Car Loan", amount: "$7000", status: "Pending" },
    { id: 2, user: "Bob Lee", loanType: "Personal Loan", amount: "$3000", status: "Pending" },
  ];

  return (
    <div className="page-container admin-page">
      <h1>Loan Approvals</h1>
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
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.user}</td>
              <td>{req.loanType}</td>
              <td>{req.amount}</td>
              <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approvals;
