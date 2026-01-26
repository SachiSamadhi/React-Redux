import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// COMPONENTS
import Sidebar from "./Components/Sidebar";

// PAGES
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import FAQ from "./Components/FAQ";
import Login from "./Components/Login";
import Register from "./Components/Register";

import Dashboard from "./Components/Dashboard";
import ApplyLoan from "./Components/ApplyLoan";
import LoanHistory from "./Components/LoanHistory";
import Repayment from "./Components/Repayment";
import Profile from "./Components/Profile";

import AdminDashboard from "./Components/Admin/AdminDashboard";
import ManageUsers from "./Components/Admin/ManageUsers";
import ManageLoans from "./Components/Admin/ManageLoans";
import Approvals from "./Components/Admin/Approvals";
import Reports from "./Components/Admin/Reports";
import Notifications from "./Components/Admin/Notifications";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    alert("Logged out successfully!");
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* SIDEBAR */}
        <Sidebar
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
        />

        {/* PAGE CONTENT */}
        <div className="page-content">
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
              }
            />
            <Route path="/register" element={<Register />} />

            {/* USER */}
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/apply-loan"
              element={isLoggedIn ? <ApplyLoan /> : <Navigate to="/login" />}
            />
            <Route
              path="/loan-history"
              element={isLoggedIn ? <LoanHistory /> : <Navigate to="/login" />}
            />
            <Route
              path="/repayment"
              element={isLoggedIn ? <Repayment /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />

            {/* ADMIN */}
            <Route
              path="/admin/dashboard"
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/users"
              element={isAdmin ? <ManageUsers /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/loans"
              element={isAdmin ? <ManageLoans /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/approvals"
              element={isAdmin ? <Approvals /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/reports"
              element={isAdmin ? <Reports /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/notifications"
              element={isAdmin ? <Notifications /> : <Navigate to="/login" />}
            />

            {/* FALLBACK */}
            <Route
              path="*"
              element={
                <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                  Page Not Found
                </h2>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
