import { useEffect, useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { API_URL } from "../../config";
import { RecommendedUsers } from "../../Components/RecommendedUsers/RecommendedUsers";

export function UserLikes() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    const userInfo = AuthService.getUserInfo();
    axios
      .get(`${API_URL}/recommendations/getUserLikes?userId=${userInfo.id}`)
      .then((response) => setRecommendedUsers(response.data))
      .catch((error) => alert("Error receiving the information :("));
  }, []);

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
      <div className={s.recommendedUsers}>
        <RecommendedUsers
          usersRecommendations={recommendedUsers}
          emptyRecommendationListMessage="No users liked you yet :)"
          onUserLike={onUserLike}
        />
      </div>
    </div>
  );
}
