import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="nav">
      <ul>
        <Link to="/">
          <li className="nav-link">Posts</li>
        </Link>

        <Link to="/favourite">
          <li className="nav-link">favourite</li>
        </Link>
      </ul>
    </div>
  );
}
export default Nav;
