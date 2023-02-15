import { useState } from "react";
import { Card } from "react-bootstrap";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import s from "./style.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { API_URL } from "../../config";

export function Register() {
  const [progressStage, setProgressStage] = useState(1);
  const [title, setTitle] = useState("Please, enter your credentials");

  function onLoginSumbit(formValues) {
    axios
      .post(`${API_URL}/auth/login`, {
        email: formValues.email,
        password: formValues.password,
      })
      .then((response) => {
        setProgressStage(progressStage + 1);
        setTitle("Please, enter info about yourself");
        alert(JSON.stringify(response));
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className={s.container}>
      <Card className={s.card}>
        <div className={s.progress_bar}>
          <ProgressBar
            now={progressStage * 33.3}
            visuallyHidden
            style={{ borderRadius: 5 }}
            variant="success"
          />
        </div>
        <div className={s.title}>
          <span>{title}</span>
        </div>
        <LoginForm onSubmit={onLoginSumbit} />
      </Card>
    </div>
  );
}
