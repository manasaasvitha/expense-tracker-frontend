import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./style.css"; // ✅ Make sure this matches your CSS file

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Single BrowserRouter wrapping the entire App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
