import axios from "axios";
import { useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { RecommendedUsers } from "../../Components/RecommendedUsers/RecommendedUsers";
import { UsersFilters } from "../../Components/UsersFilters/UsersFilters";
import { API_URL } from "../../config";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";

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
    parametersStr += "&userId=" + AuthService.getUserInfo().id;
    return parametersStr;
  }

  function onFiltersApply(formValues) {
    const parametersStr = prepareParameters(formValues);
    axios
      .get(`${API_URL}/recommendations/getRecommendedUsers?${parametersStr}`)
      .then((response) => setRecommendedUsers(response.data))
      .catch((error) => alert("Can't load recommended users :("));
  }

  function onUserLike(likedUserId) {
    const request = {
      likingUserId: AuthService.getUserInfo().id,
      likedUserId: likedUserId,
    };
    axios
      .post(`${API_URL}/recommendations/addUserLike`, request)
      .catch((error) => alert("Error saving yout like :("));
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.filters}>
        <UsersFilters onApply={onFiltersApply} />
      </div>
      <div className={s.recommendedUsers}>
        <RecommendedUsers
          usersRecommendations={recommendedUsers}
          emptyRecommendationListMessage="Set up the Search Filters and press Apply to see recommended users :)"
          onUserLike={onUserLike}
        />
      </div>
    </div>
  );
}
