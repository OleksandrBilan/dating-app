import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import s from "./style.module.css";

export function ConfirmedEmail() {
  const { userId, confirmationToken } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .post(`${API_URL}/auth/confirmEmail`, {
        userId,
        confirmationToken,
      })
      .then((response) => {
        setTitle(
          `Your email is successfully confirmed! You can now ${(
            <a onClick={() => navigate("/login")}>log in</a>
          )}  :)`
        );
      })
      .catch((error) => {
        setTitle("An error ocurred while confirming your email :(");
      });
  }, []);

  return (
    <div className={s.container}>
      <Card>{title}</Card>
    </div>
  );
}
