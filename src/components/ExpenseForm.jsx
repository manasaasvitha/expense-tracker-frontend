import React, { useState } from "react";
import API from "../api/axios";

const ExpenseForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const addExpense = async (e) => {
    e.preventDefault();
    console.log("Add Expense clicked");

    // ✅ proper validation
    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post(
        "/expenses",
        {
          title,
          amount: Number(amount),
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ reset form correctly
      setTitle("");
      setAmount("");
      setCategory("");

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="expense-form-vertical" onSubmit={addExpense}>
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        {/* ✅ placeholder option */}
        <option value="" disabled>
          Select a Category
        </option>

        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
