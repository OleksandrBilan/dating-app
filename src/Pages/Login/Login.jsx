import { LoginForm } from "../../Components/LoginForm/LoginForm";
import s from "./style.module.css";
import { Card } from "react-bootstrap";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../Store/auth/auth-slice";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(formValues) {
    document.body.style.cursor = "wait";
    axios
      .post(`${API_URL}/auth/login`, formValues)
      .then((response) => {
        const token = response.data.accessToken;
        const expiresAt = response.data.expiresAt;
        AuthService.setAuthTokenToCookie(token, expiresAt);
        AuthService.setAuthTokenToAxios(token);
        dispatch(setUserAction({ newUser: response.data.user }));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  }

  return (
    <div className={s.container}>
      <Card className={s.card} border="primary">
        <div className={s.title}>
          <span>Please, enter your credentials</span>
        </div>
        <LoginForm onSubmit={onSubmit} />
        <span className={s.register_span}>
          Don't have an account?{" "}
          <a className={s.link} onClick={() => navigate("/register")}>
            Create one
          </a>{" "}
          :)
        </span>
      </Card>
    </div>
  );
}
