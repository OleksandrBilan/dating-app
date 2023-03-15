import { AdminHome } from "../AdminHome/AdminHome";
import { AuthService } from "../../Services/auth";

export function Home() {
  const user = AuthService.getUserInfo();
  if (user) {
    let isAdmin = user.roles.includes("Admin");
    return isAdmin ? <AdminHome /> : <h1>USER</h1>;
  }

  return <span>ERROR: No user info</span>;
}
