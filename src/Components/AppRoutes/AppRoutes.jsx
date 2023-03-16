import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../../Pages/Register/Register";
import { ConfirmedEmail } from "../../Pages/ConfirmedEmail/ConfirmedEmail";
import { Login } from "../../Pages/Login/Login";
import { Home } from "../../Pages/Home/Home";
import { Questionnaire } from "../../Pages/Questionnaire/Questionnaire";
import { ProtectedRoute } from "../common/ProtectedRoute/ProtectedRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="confirmEmail/:userId" element={<ConfirmedEmail />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questionnaire"
          element={
            <ProtectedRoute>
              <Questionnaire />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
