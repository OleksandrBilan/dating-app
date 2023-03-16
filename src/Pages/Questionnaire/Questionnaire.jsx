import s from "./style.module.css";
import QuestionnaireForm from "../../Components/Questionnaire/QuestionnaireForm/QuestionnaireForm";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";

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
