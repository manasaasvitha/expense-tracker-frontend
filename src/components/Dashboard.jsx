import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import ExpenseForm from "./ExpenseForm";
import MonthlySummary from "./MonthlySummary";
import ExpenseChart from "./ExpenseChart";
import DashboardInfo from "./DashboardInfo";
import ExpensePieChart from "./ExpensePieChart";
import QuickInsights from "./QuickInsights";


import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [expenses, setExpenses] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState([]);

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setExpenses(res.data);

      // Today's expenses
      const today = new Date().toISOString().split("T")[0];
      const todayData = res.data.filter(
        (e) => e.date.split("T")[0] === today
      );
      setTodayExpenses(todayData);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <Navbar />

      {/* TOP SECTION */}
      <div className="dashboard-top-row">
        <DashboardInfo user={user} expenses={expenses} />

        <div className="pie-wrapper">
          <h3>Today’s Expenses</h3>
          <ExpensePieChart expenses={todayExpenses} />
        </div>
      </div>

      {/* OVERALL CHART */}
      <div className="card" style={{ gridColumn: "1 / -1" }}>
        <ExpenseChart expenses={expenses} />
      </div>

      {/* NAVIGATION */}
      <div className="center" style={{ marginTop: "20px" }}>
        <button
          className="primary-btn"
          onClick={() =>
            navigate("/expenses", {
              state: { allExpenses: expenses },
            })
          }
        >
          Show Expenses 
        </button>
      </div>
      
      {/* MAIN GRID */}
      <div className="dashboard-grid">
        <div className="card">
          <h2>Add New Expense</h2>
          <ExpenseForm refresh={fetchExpenses} />
        </div>

        <div className="card">
          <h2>Monthly Summary</h2>
          <MonthlySummary expenses={expenses} />
        </div>

        <div className="card">
          <h2>⚡ Quick Insights</h2>
          <QuickInsights expenses={expenses} />
        </div>
      </div>



      
    </div>
  );
};

export default Dashboard;
