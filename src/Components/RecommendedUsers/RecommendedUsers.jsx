import { useEffect, useState } from "react";
import { CaretRightFill, HeartFill } from "react-bootstrap-icons";
import s from "./style.module.css";
import { RecommendedUserInfo } from "./RecommendedUserInfo/RecommendedUserInfo";

export function RecommendedUsers({
  usersRecommendations,
  onUserLike,
  onUserSkip,
  LikeIcon,
  SkipIcon,
}) {
  const [currentRecommendationIndex, setCurrentRecommendationIndex] =
    useState(0);

  useEffect(() => {
    if (
      usersRecommendations &&
      Array.isArray(usersRecommendations) &&
      usersRecommendations.length > 0
    ) {
      setCurrentRecommendationIndex(0);
    }
  }, [usersRecommendations]);

  function showNextRecommendation() {
    setCurrentRecommendationIndex(currentRecommendationIndex + 1);
  }

  function onLike() {
    if (onUserLike)
      onUserLike(usersRecommendations[currentRecommendationIndex]);
    showNextRecommendation();
  }

  function onSkip() {
    if (onUserSkip)
      onUserSkip(usersRecommendations[currentRecommendationIndex]);
    showNextRecommendation();
  }

  if (
    usersRecommendations &&
    usersRecommendations[currentRecommendationIndex]
  ) {
    return (
      <div className={s.container}>
        <RecommendedUserInfo
          recommendedUser={usersRecommendations[currentRecommendationIndex]}
        />
        <div className={s.buttons}>
          {LikeIcon ? (
            <div className={s.icon} onClick={onLike}>
              <LikeIcon />
            </div>
          ) : (
            <HeartFill
              fill="red"
              size={30}
              className={s.icon}
              onClick={onLike}
            />
          )}
          {SkipIcon ? (
            <div className={s.icon} onClick={onSkip}>
              <SkipIcon />
            </div>
          ) : (
            <CaretRightFill
              fill="gray"
              size={35}
              className={s.icon}
              onClick={onSkip}
            />
          )}
        </div>
      </div>
    );
  }
}
