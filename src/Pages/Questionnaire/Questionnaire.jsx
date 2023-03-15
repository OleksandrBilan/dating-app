import s from "./style.module.css";
import QuestionnaireForm from "../../Components/QuestionnaireForm/QuestionnaireForm";
import { CustomNavbar } from "../../Components/CustomNavbar/CustomNavbar";

export function Questionnaire() {
  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <QuestionnaireForm />
      </div>
    </div>
  );
}
