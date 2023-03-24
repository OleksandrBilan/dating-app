import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { UsersFilters } from "../../Components/UsersFilters/UsersFilters";
import s from "./style.module.css";

export function UsersRecommendations() {
  return (
    <div className={s.container}>
      <CustomNavbar />
      <UsersFilters onApply={(formValues) => console.log(formValues)} />
      <div>ELSE</div>
    </div>
  );
}
