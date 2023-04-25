import { useEffect, useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { API_URL } from "../../config";
import { RecommendedUsers } from "../../Components/RecommendedUsers/RecommendedUsers";
import { ChatDots, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function UserMutualLikes() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = AuthService.getUserInfo().id;
    axios
      .get(`${API_URL}/recommendations/getUserMutualLikes?userId=${userId}`)
      .then((response) => {
        setRecommendedUsers(response.data);
        setLikesCount(response.data.length);
      })
      .catch((error) => alert("Error receiving the information :("));
  }, []);

  function onUserLike(recommendedUser) {
    const request = { mutualLikeId: recommendedUser.likeId };
    axios
      .post(`${API_URL}/recommendations/createChat`, request)
      .then((response) =>
        navigate("/userChats", { state: { chatId: response.data } })
      )
      .catch((error) => alert("Can't create the chat :("));
  }

  function onUserSkip(recommendedUser) {
    axios
      .delete(
        `${API_URL}/recommendations/deleteMutualLike?likeId=${recommendedUser.likeId}`
      )
      .then((response) => setLikesCount(likesCount - 1))
      .catch((error) => alert("Error skipping the user :("));
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.header}>
        {recommendedUsers && recommendedUsers.length > 0 ? (
          <h4>You have {likesCount} mutual likes :)</h4>
        ) : (
          <h4>No mutual likes yet :)</h4>
        )}
      </div>
      <div className={s.recommendedUsers}>
        <RecommendedUsers
          usersRecommendations={recommendedUsers}
          onUserLike={onUserLike}
          onUserSkip={onUserSkip}
          SkipIcon={() => <XCircle fill="gray" size={35} />}
          LikeIcon={() => <ChatDots fill="#74bbca" size={35} />}
        />
      </div>
    </div>
  );
}
