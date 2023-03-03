import s from "./style.module.css";
import { Card } from "react-bootstrap";
import { QuestionnaireForm } from "../../Components/QuestionnaireForm/QuestionnaireForm";
import { CustomNavbar } from "../../Components/CustomNavbar/CustomNavbar";

export function AdminHome() {
  if (document.body.style.cursor == "wait") {
    document.body.style.cursor = "default";
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <Card className={s.card} border="dark">
        <QuestionnaireForm />
      </Card>
    </div>
  );
}
