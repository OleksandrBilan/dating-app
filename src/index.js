import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import { ConfirmedEmail } from "./Pages/ConfirmedEmail/ConfirmedEmail";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="user/new" element={<Register />} />
        <Route path="confirmEmail/:userId" element={<ConfirmedEmail />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
