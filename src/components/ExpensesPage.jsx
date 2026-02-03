import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseList from "./ExpenseList";
import ExpenseFilters from "./ExpenseFilters";
import Navbar from "./Navbar";
import API from "../api/axios";

const ExpensesPage = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await API.get("/expenses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setExpenses(res.data);
    setFilteredExpenses(res.data); // initially show all
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="card" style={{ margin: "20px" }}>
        <button
          className="primary-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back 
        </button>

        <h2 style={{ marginTop: "15px" }}>Filter Expenses</h2>
        <ExpenseFilters
          expenses={expenses}
          onFilter={setFilteredExpenses}
        />
      </div>

      <div style={{ padding: "20px" }}>
        <ExpenseList
          expenses={filteredExpenses}
          refresh={fetchExpenses}
        />
      </div>
    </div>
  );
};

export default ExpensesPage;
