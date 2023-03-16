import { useState } from "react";
import { Card } from "react-bootstrap";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import s from "./style.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { API_URL } from "../../config";
import { UserInfoForm } from "../../Components/UserInfoForm/UserInfoForm";

export function Register() {
  const [progressStage, setProgressStage] = useState(1);
  const [userInfo, setUserInfo] = useState();

  function onLoginSubmit(formValues) {
    setUserInfo({ email: formValues.email, password: formValues.password });
    setProgressStage(progressStage + 1);
  }

  function onUserInfoSubmit(formValues) {
    let registrationInfo = {
      ...userInfo,
      ...formValues,
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
      <Card className={s.card} border="dark">
        <div className={s.progress_bar}>
          <ProgressBar
            now={progressStage * 33.3}
            visuallyHidden
            style={{ borderRadius: 5 }}
            variant="primary"
          />
        </div>
        <div className={s.title}>
          <span>
            {progressStage == 1
              ? "Please, enter your credentials"
              : progressStage == 2
              ? "Please, enter info about yourself"
              : "Please, confirm your email"}
          </span>
        </div>
        {progressStage == 1 ? (
          <LoginForm onSubmit={onLoginSubmit} />
        ) : progressStage == 2 ? (
          <UserInfoForm onSubmit={onUserInfoSubmit} />
        ) : (
          <div style={{ height: "90%" }}></div>
        )}
      </Card>
    </div>
  );
}
