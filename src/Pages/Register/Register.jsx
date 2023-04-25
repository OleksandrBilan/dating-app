import { useState } from "react";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import s from "./style.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { API_URL } from "../../config";
import { UserInfoForm } from "../../Components/UserInfoForm/UserInfoForm";
import { UserQuestionnaireForm } from "../../Components/Questionnaire/UserQuestionnaireForm/UserQuestionnaireForm";
import { ImageUploadForm } from "../../Components/ImageUploadForm/ImageUploadForm";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [progressStage, setProgressStage] = useState(1);
  const [credentials, setCredentials] = useState();
  const [userInfo, setUserInfo] = useState();
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState();
  const navigate = useNavigate();

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
    setQuestionnaireAnswers(selectedAnswers);
    setProgressStage(progressStage + 1);
  }

  function uploadImage(userId, file) {
    const formData = new FormData();
    formData.append("image", file);
    return axios({
      method: "post",
      url: `${API_URL}/user/uploadImage?userId=${userId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  function onImageUpload(file) {
    const registrationInfo = {
      ...credentials,
      ...userInfo,
      questionnaireAnswers: questionnaireAnswers,
    };

    axios
      .post(`${API_URL}/auth/register`, registrationInfo)
      .then((response) => {
        const userId = response.data;
        uploadImage(userId, file)
          .then((response) => setProgressStage(progressStage + 1))
          .catch((error) => alert(`Can't upload the image, error: ${error}`));
      })
      .catch((error) => {
        alert(`Can't create a user, error: ${error}`);
      });
  }

  function onImageSkip() {
    const registrationInfo = {
      ...credentials,
      ...userInfo,
      questionnaireAnswers: questionnaireAnswers,
    };

    axios
      .post(`${API_URL}/auth/register`, registrationInfo)
      .then((response) => setProgressStage(progressStage + 1))
      .catch((error) => alert(`Can't create a user, error: ${error}`));
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.progress_bar}>
          <ProgressBar
            now={progressStage * 20}
            visuallyHidden
            style={{ borderRadius: 6 }}
            variant="primary"
          />
        </div>
        <div className={s.title}>
          <span>
            {progressStage === 1 ? (
              "Please, enter your credentials"
            ) : progressStage === 2 ? (
              "Please, enter info about yourself"
            ) : progressStage === 3 ? (
              "Please, fill the questionnaire"
            ) : progressStage === 4 ? (
              "Please, upload your picture"
            ) : (
              <span>
                That's all :) Please, confirm your email and{" "}
                <a className={s.link} onClick={() => navigate("/login")}>
                  log in
                </a>{" "}
                ^_^
              </span>
            )}
          </span>
        </div>
        <div className={s.registerForm}>
          {progressStage === 1 ? (
            <LoginForm onSubmit={onLoginSubmit} />
          ) : progressStage === 2 ? (
            <UserInfoForm onSubmit={onUserInfoSubmit} />
          ) : progressStage === 3 ? (
            <UserQuestionnaireForm onSubmit={onQuestionnaireSubmit} />
          ) : progressStage === 4 ? (
            <ImageUploadForm onSubmit={onImageUpload} onSkip={onImageSkip} />
          ) : (
            <div style={{ height: "90%" }}></div>
          )}
        </div>
      </div>
    </div>
  );
}
