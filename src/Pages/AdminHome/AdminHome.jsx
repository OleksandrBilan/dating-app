import s from "./style.module.css";
import { Card } from "react-bootstrap";
import { QuestionnaireForm } from "../../Components/QuestionnaireForm/QuestionnaireForm";
import { CustomNavbar } from "../../Components/CustomNavbar/CustomNavbar";

export function AdminHome() {
  return (
    <div className={s.container}>
      <CustomNavbar />
      <Card className={s.card} border="primary">
        <QuestionnaireForm />
      </Card>
    </div>
  );
}
