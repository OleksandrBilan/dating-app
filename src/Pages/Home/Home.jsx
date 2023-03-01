import s from "./style.module.css";
import { AdminHome } from "../AdminHome/AdminHome";
import { useSelector } from "react-redux";

export function Home() {
  const userRoles = useSelector((store) => store.AUTH.user.roles);
  console.log(useSelector((store) => store.AUTH.user));
  let isAdmin = userRoles.includes("Admin");

  if (document.body.style.cursor == "wait") {
    document.body.style.cursor = "default";
  }

  return isAdmin ? <AdminHome /> : <h1>USER</h1>;
}
