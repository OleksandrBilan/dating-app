import { useEffect, useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { API_URL } from "../../config";
import { RecommendedUsers } from "../../Components/RecommendedUsers/RecommendedUsers";
import { XCircle } from "react-bootstrap-icons";

export function UserLikes() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const userId = AuthService.getUserInfo().id;
    setCurrentUserId(userId);
    axios
      .get(`${API_URL}/recommendations/getUserLikes?userId=${userId}`)
      .then((response) => {
        setRecommendedUsers(response.data);
        setLikesCount(response.data.length);
      })
      .catch((error) => alert("Error receiving the information :("));
  }, []);

  function onUserLike(recommendedUser) {
    const request = {
      likingUserId: currentUserId,
      likedUserId: recommendedUser.user.id,
    };
    axios
      .post(`${API_URL}/recommendations/addUserLike`, request)
      .then((response) => setLikesCount(likesCount - 1))
      .catch((error) => alert("Error saving yout like :("));
  }

  function onUserSkip(recommendedUser) {
    axios
      .delete(
        `${API_URL}/recommendations/deleteUserLike?likeId=${recommendedUser.likeId}`
      )
      .then((response) => setLikesCount(likesCount - 1))
      .catch((error) => alert("Error skipping the user :("));
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.header}>
        {recommendedUsers && recommendedUsers.length > 0 ? (
          <h4>You have {likesCount} likes :)</h4>
        ) : (
          <h4>No likes yet :)</h4>
        )}
      </div>
      <div className={s.recommendedUsers}>
        <RecommendedUsers
          usersRecommendations={recommendedUsers}
          onUserLike={onUserLike}
          onUserSkip={onUserSkip}
          SkipIcon={() => <XCircle fill="gray" size={35} />}
        />
      </div>
    </div>
  );
}
