import React, { useState } from "react";
import API from "../api/axios";

const ExpenseList = ({ expenses, refresh }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    refresh();
  };

  const startEdit = (expense) => {
    setEditingId(expense._id);
    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category || "",
      date: expense.createdAt.split("T")[0],
    });
  };

  const saveEdit = async (id) => {
    await API.put(`/expenses/${id}`, editData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setEditingId(null);
    refresh();
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  if (expenses.length === 0) {
    return <p className="empty-text">No expenses added yet</p>;
  }

  return (
    <div className="expense-list">
      <ul>
        {expenses.map((e) => (
          <li key={e._id} className="expense-item">
            {editingId === e._id ? (
              /* ✅ EDIT MODE */
              <div className="edit-form">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(ev) =>
                    setEditData({ ...editData, title: ev.target.value })
                  }
                />

                <input
                  type="number"
                  value={editData.amount}
                  onChange={(ev) =>
                    setEditData({ ...editData, amount: ev.target.value })
                  }
                />

                <select
                  value={editData.category}
                  onChange={(ev) =>
                    setEditData({ ...editData, category: ev.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>

          

                <div className="edit-actions">
                  <button className="save-btn" onClick={() => saveEdit(e._id)}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ✅ NORMAL VIEW */
              <>
                <div className="expense-left">
                  <strong>{e.title}</strong>

                  {e.category && (
                    <p className="expense-category">{e.category}</p>
                  )}

                  <p className="expense-date">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </p>

                  <p className="expense-amount">₹ {e.amount}</p>
                </div>

                <div className="expense-actions">
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(e)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(e._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
