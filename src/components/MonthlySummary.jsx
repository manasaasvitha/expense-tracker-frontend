import React from "react";

const MonthlySummary = ({ expenses }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalSpent = monthlyExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const transactions = monthlyExpenses.length;

  const categoryMap = {};
  monthlyExpenses.forEach((e) => {
    if (!e.category) return;
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  const topCategory =
    Object.keys(categoryMap).length > 0
      ? Object.keys(categoryMap).reduce((a, b) =>
          categoryMap[a] > categoryMap[b] ? a : b
        )
      : "—";

  return (
    <div className="summary-card">
      <h3>This Month</h3>

      <div className="summary-row">
        <span>Total Spent</span>
        <strong>₹ {totalSpent}</strong>
      </div>

      <div className="summary-row">
        <span>Top Category</span>
        <strong>{topCategory}</strong>
      </div>

      <div className="summary-row">
        <span>Transactions</span>
        <strong>{transactions}</strong>
      </div>
    </div>
  );
};

export default MonthlySummary;