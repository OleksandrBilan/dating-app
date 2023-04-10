import axios from "axios";
import { useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { RecommendedUsers } from "../../Components/RecommendedUsers/RecommendedUsers";
import { UsersFilters } from "../../Components/UsersFilters/UsersFilters";
import { API_URL } from "../../config";
import s from "./style.module.css";

export function UsersRecommendations() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  function prepareParameters(formValues) {
    const keys = Object.keys(formValues);
    let parametersStr = "";
    keys.forEach((k) => {
      if (formValues[k]) {
        if (parametersStr.length > 0) parametersStr += "&";
        parametersStr += k + "=" + formValues[k].toString();
      }
    });
    return parametersStr;
  }

  function onFiltersApply(formValues) {
    const parametersStr = prepareParameters(formValues);
    axios
      .get(
        `${API_URL}/recommendations/getRecommendedUsersByFilters?${parametersStr}`
      )
      .then((response) => setRecommendedUsers(response.data))
      .catch((error) => alert("Can't load recommended users :("));
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.filters}>
        <UsersFilters onApply={onFiltersApply} />
      </div>
      <div className={s.recommendedUsers}>
        <RecommendedUsers users={recommendedUsers} />
      </div>
    </div>
  );
}
