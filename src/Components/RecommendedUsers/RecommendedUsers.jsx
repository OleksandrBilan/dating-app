import axios from "axios";
import { useEffect, useState } from "react";
import { CaretRightFill, HeartFill } from "react-bootstrap-icons";
import { API_URL } from "../../config";
import s from "./style.module.css";

export function RecommendedUsers({
  usersRecommendations,
  emptyRecommendationListMessage,
  onUserLike,
}) {
  const [currentRecommendationIndex, setCurrentRecommendationIndex] =
    useState(0);
  const [sex, setSex] = useState();
  const [currentUserImageUrl, setCurrentUserImageUrl] = useState();

  function setCurrentImage() {
    if (
      usersRecommendations &&
      usersRecommendations[currentRecommendationIndex]
    ) {
      axios
        .get(
          `${API_URL}/user/getImage?userId=${usersRecommendations[currentRecommendationIndex].user.id}`,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          setCurrentUserImageUrl(url);
        })
        .catch((error) => {
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
    if (
      usersRecommendations &&
      Array.isArray(usersRecommendations) &&
      usersRecommendations.length > 0
    ) {
      setCurrentRecommendationIndex(0);
    }
  }, [usersRecommendations]);

  useEffect(() => {
    setCurrentImage();
  }, [usersRecommendations, currentRecommendationIndex]);

  function calculateAge(birthDate) {
    return Math.floor(
      (new Date() - new Date(birthDate).getTime()) / 3.15576e10
    );
  }

  function showNextRecommendation() {
    setCurrentRecommendationIndex(currentRecommendationIndex + 1);
  }

  function onLike() {
    onUserLike(usersRecommendations[currentRecommendationIndex].user.id);
    showNextRecommendation();
  }

  function onSkip() {
    showNextRecommendation();
  }

  if (
    usersRecommendations &&
    usersRecommendations[currentRecommendationIndex]
  ) {
    return (
      <div className={s.container}>
        <div className={s.top}>
          <div className={s.topInfo}>
            <h2 className={s.name}>
              {usersRecommendations[currentRecommendationIndex].user.name}
            </h2>
            <span className={s.tag}>
              Similarity:{" "}
              {
                <span className={s.infoLine}>
                  {`${Math.floor(
                    usersRecommendations[currentRecommendationIndex]
                      .similarityScore * 100
                  )}%`}
                </span>
              }
            </span>
            <span className={s.tag}>
              Age:{" "}
              {
                <span className={s.infoLine}>
                  {calculateAge(
                    usersRecommendations[currentRecommendationIndex].user
                      .birthDate
                  )}
                </span>
              }
            </span>
            <span className={s.tag}>
              Sex:{" "}
              {
                <span className={s.infoLine}>
                  {
                    sex.find(
                      (s) =>
                        s.id ===
                        usersRecommendations[currentRecommendationIndex].user
                          .sexId
                    ).name
                  }
                </span>
              }
            </span>
            <span className={s.tag}>
              Country:{" "}
              {
                <span className={s.infoLine}>
                  {
                    usersRecommendations[currentRecommendationIndex].user
                      .country.name
                  }
                </span>
              }
            </span>
            <span className={s.tag}>
              City:{" "}
              {
                <span className={s.infoLine}>
                  {
                    usersRecommendations[currentRecommendationIndex].user.city
                      .name
                  }
                </span>
              }
            </span>
            <div className={s.descriptionDiv}>
              <span className={s.tag}>Description: </span>
              <span className={s.infoLine}>
                {
                  usersRecommendations[currentRecommendationIndex].user
                    .description
                }
              </span>
            </div>
          </div>
          <div className={s.photo}>
            <img
              className={s.image}
              src={currentUserImageUrl}
              alt="User Avatar"
            />
          </div>
        </div>
        <div className={s.buttons}>
          <HeartFill fill="red" size={30} className={s.icon} onClick={onLike} />
          <CaretRightFill
            fill="gray"
            size={35}
            className={s.icon}
            onClick={onSkip}
          />
        </div>
      </div>
    );
  } else {
    return <h4>{emptyRecommendationListMessage}</h4>;
  }
}
