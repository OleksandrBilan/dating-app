import s from "./style.module.css";
import { AdminQuestionnaireForm } from "../../Components/Questionnaire/AdminQuestionnaireForm/AdminQuestionnaireForm";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";

export function AdminQuestionnaire() {
  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <AdminQuestionnaireForm />
      </div>
    </div>
  );
}
