import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import shipHero from "../assets/9.jpg";  

const Home = () => {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Employee Management System</h1>
          <p>Manage your workforce efficiently, securely and smartly.</p>
          <Link to="/ReadEmployee" className="btn-primary">View Employees</Link>
        </div>

        {/* SHIP HERO IMAGE */}
        <div className="hero-image">
          <img src={shipHero} alt="Ship Illustration" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="" />
          <h3>Employee Records</h3>
          <p>Maintain all employee personal and professional details.</p>
        </div>

        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/4149/4149678.png" alt="" />
          <h3>Quick Updates</h3>
          <p>Edit and update employee records in real-time.</p>
        </div>

        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="" />
          <h3>Secure Storage</h3>
          <p>All data is safely stored in your SQL database.</p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Start Managing Employees Now</h2>
        <Link to="/CreateEmployee" className="btn-secondary">Add New Employee +</Link>
      </section>

    </div>
  );
};

export default Home;
