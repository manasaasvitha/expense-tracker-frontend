import React, { useState } from "react";

const ExpenseFilters = ({ expenses, onFilter }) => {
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const applyFilter = () => {
    let filtered = [...expenses];
    const today = new Date();

    if (category) {
      filtered = filtered.filter((exp) => exp.category === category);
    }

    if (dateFilter === "today") {
      filtered = filtered.filter((exp) => {
        const d = new Date(exp.createdAt);
        return d.toDateString() === today.toDateString();
      });
    }

    if (dateFilter === "month") {
      filtered = filtered.filter((exp) => {
        const d = new Date(exp.createdAt);
        return (
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      });
    }

    onFilter(filtered);
  };

  // ✅ NEW: Clear filter
  const clearFilter = () => {
    setCategory("");
    setDateFilter("all");
    onFilter(expenses);
  };

  return (
    <div className="filters">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
        
      </select>

      <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
        <option value="all">All Dates</option>
        <option value="today">Today</option>
        <option value="month">This Month</option>
      </select>

      <div className="filter-buttons">
        <button onClick={applyFilter} className="filter-btn">Apply Filters</button>
        <button onClick={clearFilter} className="filter-btn">
          Clear
        </button>
      </div>
    </div>
  );
};

export default ExpenseFilters;
