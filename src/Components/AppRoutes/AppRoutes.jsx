import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../../Pages/Register/Register";
import { ConfirmedEmail } from "../../Pages/ConfirmedEmail/ConfirmedEmail";
import { Login } from "../../Pages/Login/Login";
import { Home } from "../../Pages/Home/Home";
import { AdminQuestionnaire } from "../../Pages/AdminQuestionnaire/AdminQuestionnaire";
import { ProtectedRoute } from "../common/ProtectedRoute/ProtectedRoute";
import { UserQuestionnaire } from "../../Pages/UserQuestionnaire/UserQuestionnaire";
import { UsersRecommendations } from "../../Pages/UsersRecommendations/UsersRecommendations";

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
          path="/adminQuestionnaire"
          element={
            <ProtectedRoute>
              <AdminQuestionnaire />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userQuestionnaire"
          element={
            <ProtectedRoute>
              <UserQuestionnaire />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usersRecommendations"
          element={
            <ProtectedRoute>
              <UsersRecommendations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
