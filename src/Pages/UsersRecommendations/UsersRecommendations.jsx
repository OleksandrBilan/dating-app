import axios from "axios";
import { useEffect, useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { RecommendedUsers } from "../../Components/RecommendedUsers/RecommendedUsers";
import { UsersFilters } from "../../Components/UsersFilters/UsersFilters";
import { API_URL } from "../../config";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";

export function UsersRecommendations() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(AuthService.getUserInfo().id);
  }, []);

  function prepareParameters(formValues) {
    const keys = Object.keys(formValues);
    let parametersStr = "";
    keys.forEach((k) => {
      if (formValues[k]) {
        if (parametersStr.length > 0) parametersStr += "&";
        parametersStr += k + "=" + formValues[k].toString();
      }
    });
    parametersStr += "&userId=" + userId;
    return parametersStr;
  }

  function onFiltersApply(formValues) {
    const parametersStr = prepareParameters(formValues);
    axios
      .get(`${API_URL}/recommendations/getRecommendedUsers?${parametersStr}`)
      .then((response) => setRecommendedUsers(response.data))
      .catch((error) => alert("Can't load recommended users :("));
  }

  function onUserLike(recommendation) {
    const request = {
      likingUserId: userId,
      likedUserId: recommendation.user.id,
    };
    axios
      .post(`${API_URL}/recommendations/addUserLike`, request)
      .then((response) => {
        if (response.data === false) {
          alert(
            "You can't like any more people today (you can ugrade to VIP to avoid this limitation) :)"
          );
          setRecommendedUsers([]);
        }
      })
      .catch((error) => alert("Error saving yout like :("));
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.filters}>
        <UsersFilters onApply={onFiltersApply} />
      </div>
      <div className={s.recommendedUsers}>
        {recommendedUsers && recommendedUsers.length > 0 ? (
          <RecommendedUsers
            usersRecommendations={recommendedUsers}
            onUserLike={onUserLike}
          />
        ) : (
          <h4>
            Set up the Search Filters and press Apply to see recommended users
            :)
          </h4>
        )}
      </div>
    </div>
  );
}
