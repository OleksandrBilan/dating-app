import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../../Pages/Register/Register";
import { ConfirmedEmail } from "../../Pages/ConfirmedEmail/ConfirmedEmail";
import { Login } from "../../Pages/Login/Login";
import { Home } from "../../Pages/Home/Home";
import { AdminQuestionnaire } from "../../Pages/AdminQuestionnaire/AdminQuestionnaire";
import { ProtectedRoute } from "../common/ProtectedRoute/ProtectedRoute";
import { UserQuestionnaire } from "../../Pages/UserQuestionnaire/UserQuestionnaire";
import { UsersRecommendations } from "../../Pages/UsersRecommendations/UsersRecommendations";
import { EditUserProfile } from "../../Pages/EditUserProfile/EditUserProfile";
import { UserLikes } from "../../Pages/UserLikes/UserLikes";
import { UserMutualLikes } from "../../Pages/UserMutualLikes/UserMutualLikes";
import { UserChats } from "../../Pages/UserChats/UserChats";

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
        <Route
          path="/editUserProfile"
          element={
            <ProtectedRoute>
              <EditUserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userLikes"
          element={
            <ProtectedRoute>
              <UserLikes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userMutualLikes"
          element={
            <ProtectedRoute>
              <UserMutualLikes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userChats"
          element={
            <ProtectedRoute>
              <UserChats />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
