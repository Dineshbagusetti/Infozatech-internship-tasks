import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      {/* LOGO SECTION */}

      <div className="logo-section">

        <div className="logo">
          Quick<span>Link</span>
        </div>

        <p>
          Short URLs. Big Possibilities.
        </p>

      </div>

      {/* NAVIGATION */}

      <nav className="navigation">

        {/* HOME */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        {/* MY LINKS */}
        <NavLink
          to="/links"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          My Links
        </NavLink>

        {/* ABOUT */}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          About
        </NavLink>

      </nav>

    </header>
  );
}

export default Header;
