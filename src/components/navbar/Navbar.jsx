import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">

      {/* LEFT SIDE */}
      <div className="navbar-left">
        <input
          type="text"
          placeholder="Search students, parents, staff..."
          className="search-input"
        />

        <select className="campus-select">
          <option>Bangalore</option>
          <option>Pune</option>
          <option>Mumbai</option>
        </select>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-right">

        <Link to="/refund-management">
          <button className="btn primary-btn">
            Refund Management
          </button>
        </Link>

        <Link to="/bulk-upload">
          <button className="btn secondary-btn">
            Bulk Upload
          </button>
        </Link>

        <Link to="/export-report">
          <button className="btn secondary-btn">
            Export Report
          </button>
        </Link>

        <button className="icon-btn">
          🔔
          <span className="badge">3</span>
        </button>

        <div className="profile">
          PS
        </div>

      </div>
    </header>
  );
};

export default Navbar;
