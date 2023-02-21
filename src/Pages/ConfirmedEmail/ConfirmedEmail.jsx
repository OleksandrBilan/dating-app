import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import s from "./style.module.css";

export function ConfirmedEmail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState();

  useEffect(() => {
    axios
      .post(`${API_URL}/auth/confirmEmail`, { userId })
      .then((response) => {
        setTitle(
          <div>
            Your email is successfully confirmed! You can now{" "}
            <span className={s.link}>
              <a onClick={() => navigate("/login")}>log in</a>
            </span>{" "}
            :)
          </div>
        );
      })
      .catch((error) => {
        setTitle("An error ocurred while confirming your email :(");
      });
  });

  return (
    <div className={s.container}>
      <Card border="primary" className={s.card}>
        <span className={s.title}>{title}</span>
      </Card>
    </div>
  );
}
