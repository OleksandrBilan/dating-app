import { AdminHome } from "../AdminHome/AdminHome";
import { AuthService } from "../../Services/auth";
import { UserHome } from "../UserHome/UserHome";

export function Home() {
  const user = AuthService.getUserInfo();
  if (user) {
    let isAdmin = user.roles.includes("Admin");
    return isAdmin ? <AdminHome /> : <UserHome />;
  }

  return <span>ERROR: No user info</span>;
}
