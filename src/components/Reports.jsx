import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const Reports = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  // Calculations
  const totalAmount = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const today = new Date().toISOString().split("T")[0];
  const todayTotal = expenses
    .filter((e) => (e.date || e.createdAt)?.split("T")[0] === today)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const currentMonth = new Date().getMonth();
  const monthlyTotal = expenses
    .filter(
      (e) =>
        new Date(e.date || e.createdAt).getMonth() === currentMonth
    )
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  const topCategory =
    Object.keys(categoryMap).length > 0
      ? Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0][0]
      : "N/A";

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h2>Expense Reports</h2>

        {/* SUMMARY CARDS */}
        <div className="report-cards">
          <div className="report-card">
            <h4>Total Expenses</h4>
            <p>₹{totalAmount}</p>
          </div>

          <div className="report-card">
            <h4>This Month</h4>
            <p>₹{monthlyTotal}</p>
          </div>

          <div className="report-card">
            <h4>Today</h4>
            <p>₹{todayTotal}</p>
          </div>

          <div className="report-card">
            <h4>Top Category</h4>
            <p>{topCategory}</p>
          </div>
        </div>

        {/* EXPENSE TABLE */}
        <div className="card">
          <h3>Expense Report</h3>

          {expenses.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No expenses available
            </p>
          ) : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Expense</th>
                  <th>Amount </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e._id}>
                    <td>
                      {(e.date || e.createdAt)?.split("T")[0]}
                    </td>
                    <td>{e.category}</td>
                    <td>{e.title || "—"}</td>
                    <td>₹{e.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
