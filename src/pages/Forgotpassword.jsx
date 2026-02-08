import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ REQUIRED

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`,
        { email }
      );

      setLink(res.data.resetLink);
      toast.success("Reset link generated");

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email / User not found"); // ✅ THIS WILL SHOW
    }
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
