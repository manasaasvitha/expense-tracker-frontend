import React from "react";

const DashboardInfo = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="dashboard-info">

      <img src="/images/finance.png" alt="User" className="dashboard-img" />
      
      <h2 className="dashboard-title">
        Hello {user?.name}
        <p className="dashboard-subtitle">
        Take a look at your current balance 💸
      </p>
      </h2>

      

      <div className="info-cards">
        <div className="info-card">
          <h3>📊 Track Expenses</h3>
          <p>
            Record your daily expenses and keep track of where your money is
            spent.
          </p>
        </div>

        <div className="info-card">
          <h3>📂 Categories</h3>
          <p>
            Organize expenses into categories like Food, Travel, Shopping, and
            more.
          </p>
        </div>

        <div className="info-card">
          <h3>📈 Smart Insights</h3>
          <p>
            Understand spending patterns and improve financial habits with ease.
          </p>
        </div>
      </div>

    </div>
  );
};

export default DashboardInfo;
