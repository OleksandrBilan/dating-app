import s from "./style.module.css";
import QuestionnaireForm from "../../Components/QuestionnaireForm/QuestionnaireForm";
import { CustomNavbar } from "../../Components/CustomNavbar/CustomNavbar";

const AdminHome = () => {
  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <QuestionnaireForm />
      </div>
    </div>
  );
};

export default AdminHome;
