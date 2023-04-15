import { useEffect, useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { API_URL } from "../../config";
import { RecommendedUsers } from "../../Components/RecommendedUsers/RecommendedUsers";

export function UserMutualLikes() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    const userInfo = AuthService.getUserInfo();
    axios
      .get(
        `${API_URL}/recommendations/getUserMutualLikes?userId=${userInfo.id}`
      )
      .then((response) => setRecommendedUsers(response.data))
      .catch((error) => alert("Error receiving the information :("));
  }, []);

  function onUserLike(likedUserId) {
    alert("ok");
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.recommendedUsers}>
        <RecommendedUsers
          usersRecommendations={recommendedUsers}
          emptyRecommendationListMessage="No mutual likes yet :)"
          onUserLike={onUserLike}
        />
      </div>
    </div>
  );
}
