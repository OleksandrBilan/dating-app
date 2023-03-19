import s from "./style.module.css";
import { AuthService } from "../../Services/auth";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";

export function UserHome() {
  const name = AuthService.getUserInfo().name;

  return (
    <div className={s.container}>
      <CustomNavbar />
      <h1>Welcome, {name}</h1>
    </div>
  );
}
