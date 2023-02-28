import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Expense Tracker</Link>
        </li>
        <li>
          <Link to="/add">Add New Expense</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
