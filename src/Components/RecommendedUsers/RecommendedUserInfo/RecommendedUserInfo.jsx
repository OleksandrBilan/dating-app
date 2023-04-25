import { useEffect, useState } from "react";
import s from "./style.module.css";
import axios from "axios";
import { API_URL } from "../../../config";

export function RecommendedUserInfo({ recommendedUser }) {
  const [sex, setSex] = useState();
  const [currentUserImageUrl, setCurrentUserImageUrl] = useState();

  function setCurrentImage() {
    if (recommendedUser) {
      axios
        .get(`${API_URL}/user/getImage?userId=${recommendedUser.user.id}`, {
          responseType: "blob",
        })
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          setCurrentUserImageUrl(url);
        })
        .catch((error) => {
          console.clear();
          setCurrentUserImageUrl("");
        });
    } else {
      setCurrentUserImageUrl("");
    }
  }

  useEffect(() => {
    axios.get(`${API_URL}/lookup/getSex`).then((response) => {
      setSex(response.data);
    });
    setCurrentImage();
  }, []);

  useEffect(() => {
    setCurrentImage();
  }, [recommendedUser]);

  function calculateAge(birthDate) {
    return Math.floor(
      (new Date() - new Date(birthDate).getTime()) / 3.15576e10
    );
  }

  if (recommendedUser && sex)
    return (
      <div className={s.top}>
        <div className={s.topInfo}>
          <h2 className={s.name}>{recommendedUser.user.name}</h2>
          <span className={s.tag}>
            Similarity:{" "}
            {
              <span className={s.infoLine}>
                {`${Math.floor(recommendedUser.similarityScore * 100)}%`}
              </span>
            }
          </span>
          <span className={s.tag}>
            Age:{" "}
            {
              <span className={s.infoLine}>
                {calculateAge(recommendedUser.user.birthDate)}
              </span>
            }
          </span>
          <span className={s.tag}>
            Sex:{" "}
            {
              <span className={s.infoLine}>
                {sex.find((s) => s.id === recommendedUser.user.sexId).name}
              </span>
            }
          </span>
          <span className={s.tag}>
            Country:{" "}
            {
              <span className={s.infoLine}>
                {recommendedUser.user.country.name}
              </span>
            }
          </span>
          <span className={s.tag}>
            City:{" "}
            {
              <span className={s.infoLine}>
                {recommendedUser.user.city.name}
              </span>
            }
          </span>
          <div className={s.descriptionDiv}>
            <span className={s.tag}>Description: </span>
            <span className={s.infoLine}>
              {recommendedUser.user.description}
            </span>
          </div>
        </div>
        <div className={s.photo}>
          <img
            className={s.image}
            src={currentUserImageUrl}
            alt="No user photo"
          />
        </div>
      </div>
    );
}
