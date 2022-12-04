import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
      <Link className="navbar-brand" to="/">
        KK's Guitar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="students">
              Students
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="batches">
              Batches
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
