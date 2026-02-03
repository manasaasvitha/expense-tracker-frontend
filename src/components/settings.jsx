import React, { useState } from "react";
import Navbar from "./Navbar";
import API from "../api/axios";


const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [currency, setCurrency] = useState("₹ INR");
  const [dailyReminder, setDailyReminder] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const clearData = async () => {
  if (!window.confirm("Are you sure? This will delete all expenses.")) return;

  try {
    await API.delete(`/expenses/clear/${user.id}`);

    // clear frontend data
    localStorage.removeItem("expenses");

    alert("All expenses deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete expenses");
  }
};


 


  return (
    <>
      <Navbar />

      <div className="settings-page">
        <h2>⚙️ Settings</h2>

        {/* Profile */}
        <div className="settings-card">
          <h3>Profile</h3>
          <p><b>Name:</b> {user?.name}</p>
          <p><b>Email:</b> {user?.email}</p>
        </div>

        

        

        

        {/* Danger Zone */}
        <div className="settings-card danger">
          <h3>Danger Zone</h3>
          <button className="danger-btn" onClick={clearData}>
            Clear All Expenses
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
