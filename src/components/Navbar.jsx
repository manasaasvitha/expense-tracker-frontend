import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login"); // or "/" if your login page is home
 };


  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        ExpenseX
      </h2>

      <div className="nav-links">
        <span onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          Dashboard
        </span>

        <span onClick={() => navigate("/reports")} style={{ cursor: "pointer" }}>
          Reports
        </span>

  

        <span onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
          Profile
        </span>

        <span onClick={() => navigate("/settings")} style={{ cursor: "pointer" }}>
          Settings
        </span>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
