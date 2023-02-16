import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ConfirmedEmail } from "./Pages/ConfirmedEmail/ConfirmedEmail";
import { Register } from "./Pages/Register/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/user/new" element={<Register />} />
        <Route
          path="/confirmEmail/:userId/:confirmationToken"
          element={<ConfirmedEmail />}
        />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
