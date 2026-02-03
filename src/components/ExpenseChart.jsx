import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseChart = ({ expenses }) => {
  // Prepare month-wise data
  const data = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthlyTotals = Array(12).fill(0);

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const month = date.getMonth(); // 0-11
      monthlyTotals[month] += Number(expense.amount);
    });

    return months.map((month, index) => ({
      month,
      amount: monthlyTotals[index],
    }));
  }, [expenses]);

  return (
    <div style={{ width: "100%", height: "250px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹ ${value}`} />
          <Bar dataKey="amount" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
