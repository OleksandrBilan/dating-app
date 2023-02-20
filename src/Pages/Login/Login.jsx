import { LoginForm } from "../../Components/LoginForm/LoginForm";
import s from "./style.module.css";
import { Card } from "react-bootstrap";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { AuthService, setAuthTokenToAxios } from "../../Services/auth";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();

  function onSubmit(formValues) {
    axios
      .post(`${API_URL}/auth/login`, formValues)
      .then((response) => {
        const token = response.data.accessToken;
        const expiresAt = response.data.expiresAt;
        AuthService.setCookie("token", token, expiresAt);
        AuthService.setAuthTokenToAxios(token);
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={s.container}>
      <Card className={s.card} border="primary">
        <div className={s.title}>
          <span>Please, enter your credentials</span>
        </div>
        <LoginForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
}
