import { useState } from "react";
import axios from "axios";


const API_URL = "https://expense-tracker-backend-1sbp.onrender.com/api";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    setLink(res.data.resetLink);
  };

  return (
    <div className="auth-container">
        <div className="auth-box">
        <h2>Forgot Password</h2>

         <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* ✅ type="submit" */}
          <button type="submit" className="auth-btn">
            Generate Reset Link
          </button>
        </form>
        
        {link && (
            <p>
             Reset Link: <a href={link}>{link}</a>
            </p>
        )}
        </div>
    </div>
  );
}
