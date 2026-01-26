import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/L1.png";

const Sidebar = ({ isLoggedIn, isAdmin, handleLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src={logo} alt="Smart Lend Logo" />
        <h3>SMART LEND</h3>
      </div>

      <nav className="sidebar-nav">
        {!isLoggedIn && (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isLoggedIn && !isAdmin && (
          <>
            <h4>My Account</h4>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/apply-loan">Apply Loan</Link>
            <Link to="/loan-history">Loan History</Link>
            <Link to="/repayment">Repayment</Link>
            <Link to="/profile">Profile</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {isLoggedIn && isAdmin && (
          <>
            <h4>Admin Panel</h4>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Manage Users</Link>
            <Link to="/admin/loans">Manage Loans</Link>
            <Link to="/admin/approvals">Approvals</Link>
            <Link to="/admin/reports">Reports</Link>
            <Link to="/admin/notifications">Notifications</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
