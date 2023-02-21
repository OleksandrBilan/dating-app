import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../../Pages/Register/Register";
import { ConfirmedEmail } from "../../Pages/ConfirmedEmail/ConfirmedEmail";
import { Login } from "../../Pages/Login/Login";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { Test } from "../Test";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user/new" element={<Register />} />
        <Route path="confirmEmail/:userId" element={<ConfirmedEmail />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
