import s from "./style.module.css";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { UserQuestionnaireForm } from "../../Components/Questionnaire/UserQuestionnaireForm/UserQuestionnaireForm";
import { useState, useEffect } from "react";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { API_URL } from "../../config";

export function UserQuestionnaire() {
  const [savedAnswers, setSavedAnswers] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const userInfo = AuthService.getUserInfo();
    if (userInfo) {
      axios
        .get(`${API_URL}/questionnaire/getUserAnswers?userId=${userInfo.id}`)
        .then((response) => {
          setSavedAnswers(response.data);
        })
        .catch((error) => alert("Can not load your answers :("));

      setUserId(userInfo.id);
    }
  }, []);

  function onQuestionnaireSubmit(clickedAnswers) {
    let request = {
      userId: userId,
      answers: clickedAnswers,
    };

    axios
      .post(`${API_URL}/questionnaire/updateUserAnswers`, request)
      .then((response) => {
        alert("Answers have been updated succesfully :)");
      })
      .catch((error) => {
        alert("Can not update the answers :(");
      });
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <UserQuestionnaireForm
          onSubmit={onQuestionnaireSubmit}
          savedAnswers={savedAnswers}
        />
      </div>
    </div>
  );
}
