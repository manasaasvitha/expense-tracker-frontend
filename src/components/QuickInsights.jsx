import React from "react";

const QuickInsights = ({ expenses = [] }) => {
  if (!Array.isArray(expenses)) expenses = [];

  // Category totals
  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + Number(e.amount || 0);
  });

  const mostSpentCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : "N/A";

  const mostSpentAmount = categoryTotals[mostSpentCategory] || 0;

  const highestExpense =
    expenses.length > 0
      ? expenses.reduce((max, e) =>
          Number(e.amount) > Number(max.amount) ? e : max
        )
      : null;

  const lastExpense =
    expenses.length > 0
      ? [...expenses].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )[0]
      : null;

  return (
    <div className="card quick-insights-card">
      
      <p>
        🛒 <strong>Most Spent:</strong>{" "}
        {mostSpentCategory !== "N/A"
          ? `${mostSpentCategory} – ₹${mostSpentAmount}`
          : "N/A"}
      </p>

      <p>
        💰 <strong>Highest Expense:</strong>{" "}
        {highestExpense
          ? `₹${highestExpense.amount} (${highestExpense.category})`
          : "N/A"}
      </p>

      <p>
        📅 <strong>Last Expense:</strong>{" "}
        {lastExpense
          ? new Date(lastExpense.date).toLocaleDateString()
          : "N/A"}
      </p>
    </div>
  );
};

export default QuickInsights;
