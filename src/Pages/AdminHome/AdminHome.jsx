import s from "./style.module.css";
import { QuestionnaireForm } from "../../Components/QuestionnaireForm/QuestionnaireForm";
import { CustomNavbar } from "../../Components/CustomNavbar/CustomNavbar";

export function AdminHome() {
  if (document.body.style.cursor === "wait") {
    document.body.style.cursor = "default";
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <QuestionnaireForm />
      </div>
    </div>
  );
}
