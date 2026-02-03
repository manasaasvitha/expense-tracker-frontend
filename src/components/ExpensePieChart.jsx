import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444", "#0ea5e9","#a855f7"];

const ExpensePieChart = ({ expenses }) => {
  const categoryData = {};

  expenses.forEach((e) => {
    categoryData[e.category] =
      (categoryData[e.category] || 0) + e.amount;
  });

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  if (data.length === 0) {
    return <p>No expenses today</p>;
  }

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ExpensePieChart;
