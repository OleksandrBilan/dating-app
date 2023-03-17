import { useState } from "react";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import s from "./style.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { API_URL } from "../../config";
import { UserInfoForm } from "../../Components/UserInfoForm/UserInfoForm";
import { UserQuestionnaireForm } from "../../Components/Questionnaire/UserQuestionnaireForm/UserQuestionnaireForm";

export function Register() {
  const [progressStage, setProgressStage] = useState(1);
  const [credentials, setCredentials] = useState();
  const [userInfo, setUserInfo] = useState();

  function onLoginSubmit(formValues) {
    axios
      .get(`${API_URL}/auth/checkIfUserExists?email=${formValues.email}`)
      .then((response) => {
        if (response.data === true) {
          alert("User with such email already exists");
        } else {
          setCredentials({
            email: formValues.email,
            password: formValues.password,
          });
          setProgressStage(progressStage + 1);
        }
      })
      .catch((error) => {
        alert("Error checking the email :(");
      });
  }

  function onUserInfoSubmit(formValues) {
    setUserInfo(formValues);
    setProgressStage(progressStage + 1);
  }

  function onQuestionnaireSubmit(selectedAnswers) {
    const registrationInfo = {
      ...credentials,
      ...userInfo,
      questionnaireAnswers: selectedAnswers,
    };

    axios
      .post(`${API_URL}/auth/register`, registrationInfo)
      .then((response) => {
        setProgressStage(progressStage + 1);
      })
      .catch((error) => {
        alert(`Can't create a user, error: ${error}`);
      });
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.progress_bar}>
          <ProgressBar
            now={progressStage * 25}
            visuallyHidden
            style={{ borderRadius: 5 }}
            variant="primary"
          />
        </div>
        <div className={s.title}>
          <span>
            {progressStage === 1
              ? "Please, enter your credentials"
              : progressStage === 2
              ? "Please, enter info about yourself"
              : progressStage === 3
              ? "Please, fill the questionnaire"
              : "Please, confirm your email"}
          </span>
        </div>
        {progressStage === 1 ? (
          <LoginForm onSubmit={onLoginSubmit} />
        ) : progressStage === 2 ? (
          <UserInfoForm onSubmit={onUserInfoSubmit} />
        ) : progressStage === 3 ? (
          <UserQuestionnaireForm onSubmit={onQuestionnaireSubmit} />
        ) : (
          <div style={{ height: "90%" }}></div>
        )}
      </div>
    </div>
  );
}
